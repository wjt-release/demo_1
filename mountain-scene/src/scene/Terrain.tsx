import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { damp } from '../lib/damp'
import type { TerrainBundle } from './terrainGen'

export function Terrain(props: {
  bundle: TerrainBundle
  contoursEnabled: boolean
  contourDensity: number
}) {
  const contourMesh = useRef<THREE.Mesh | null>(null)
  const contourAmount = useRef(0)

  const baseMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.92,
        metalness: 0.02,
      }),
    [],
  )

  const contourShader = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
      uniforms: {
        uOpacity: { value: 0 },
        uDensity: { value: props.contourDensity },
        uHeightOffset: { value: -props.bundle.minHeight + 0.4 },
        uLineColor: { value: new THREE.Color('#d9f7ff') },
      },
      vertexShader: `
        varying float vH;
        void main() {
          vH = position.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float vH;
        uniform float uOpacity;
        uniform float uDensity;
        uniform float uHeightOffset;
        uniform vec3 uLineColor;

        float aastep(float threshold, float value) {
          float afwidth = fwidth(value) * 0.85;
          return smoothstep(threshold - afwidth, threshold + afwidth, value);
        }

        void main() {
          float h = max(0.0, vH + uHeightOffset);
          float bands = h * uDensity;
          float f = abs(fract(bands) - 0.5);
          float core = 1.0 - aastep(0.49, f);
          float feather = smoothstep(0.52, 0.46, f);
          float alpha = core * feather * uOpacity;
          if (alpha < 0.003) discard;
          gl_FragColor = vec4(uLineColor, alpha);
        }
      `,
    })
    return mat
  }, [props.bundle.minHeight, props.contourDensity])

  useFrame((_, dt) => {
    const target = props.contoursEnabled ? 1 : 0
    contourAmount.current = damp(contourAmount.current, target, 10, dt)
    const mat = contourMesh.current?.material
    if (mat && mat instanceof THREE.ShaderMaterial) {
      mat.uniforms.uOpacity.value = contourAmount.current * 0.92
      mat.uniforms.uDensity.value = props.contourDensity
    }
  })

  return (
    <group>
      <mesh geometry={props.bundle.geometry} material={baseMat} receiveShadow castShadow />
      <mesh geometry={props.bundle.geometry} material={contourShader} ref={contourMesh} />
    </group>
  )
}
