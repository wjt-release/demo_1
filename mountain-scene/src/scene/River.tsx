import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { damp } from '../lib/damp'

function buildRibbon(curve: THREE.Curve<THREE.Vector3>, width: number, segments: number) {
  const positions: number[] = []
  const uvs: number[] = []
  const indices: number[] = []
  const up = new THREE.Vector3(0, 1, 0)

  const pts = curve.getPoints(segments)
  for (let i = 0; i < pts.length; i += 1) {
    const t = i / (pts.length - 1)
    const p = pts[i].clone()
    p.y = -1.75

    const tangent = curve.getTangent(t).normalize()
    const side = new THREE.Vector3().crossVectors(up, tangent).normalize()
    const w = width * (0.78 + 0.22 * Math.sin(t * Math.PI * 2.1))

    const left = p.clone().addScaledVector(side, -w)
    const right = p.clone().addScaledVector(side, w)

    positions.push(left.x, left.y, left.z, right.x, right.y, right.z)
    uvs.push(0, t, 1, t)

    const base = i * 2
    if (i < pts.length - 1) {
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geo.setIndex(indices)
  geo.computeVertexNormals()
  return geo
}

export function River(props: { curve: THREE.CatmullRomCurve3; dayRef: MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const day = useRef(props.dayRef.current)

  const geometry = useMemo(() => buildRibbon(props.curve, 1.05, 160), [props.curve])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uDay: { value: props.dayRef.current },
        uColorDeep: { value: new THREE.Color('#062233') },
        uColorShallow: { value: new THREE.Color('#1d6f7d') },
        uMoonTint: { value: new THREE.Color('#76c9ff') },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        void main() {
          vUv = uv;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vWorldPos;
        uniform float uTime;
        uniform float uDay;
        uniform vec3 uColorDeep;
        uniform vec3 uColorShallow;
        uniform vec3 uMoonTint;
        uniform vec3 cameraPosition;

        float hash(vec2 p){
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 34.345);
          return fract(p.x * p.y);
        }

        void main() {
          vec2 uv = vUv;
          float flow = uTime * 0.35;
          float w1 = sin((uv.y * 18.0 + flow) + sin(uv.y * 6.0 - flow) * 0.75);
          float w2 = sin((uv.y * 35.0 - flow * 1.4) + uv.x * 2.0);
          float rip = (w1 * 0.55 + w2 * 0.45) * 0.06;

          vec3 viewDir = normalize(cameraPosition - vWorldPos);
          float fres = pow(1.0 - max(0.0, dot(viewDir, vec3(0.0, 1.0, 0.0))), 3.0);

          float depth = smoothstep(0.0, 1.0, uv.x);
          depth = 1.0 - abs(depth * 2.0 - 1.0);
          float center = pow(depth, 0.65);

          vec3 base = mix(uColorDeep, uColorShallow, center);
          vec3 nightTint = mix(base, uMoonTint, 0.42);
          vec3 col = mix(nightTint, base, uDay);

          float sparkle = pow(max(0.0, w1 + w2), 4.0) * 0.85;
          sparkle *= mix(0.35, 1.0, uDay) + (1.0 - uDay) * 0.55;
          sparkle *= smoothstep(0.25, 0.9, center);
          sparkle += pow(fres, 1.35) * 0.65;

          float grain = hash(uv * 820.0 + uTime * 0.01) * 0.02;
          col += (sparkle + grain) * 0.22;

          float alpha = 0.82;
          alpha *= smoothstep(0.02, 0.28, center);
          alpha *= smoothstep(0.0, 0.35, 1.0 - abs(rip));
          gl_FragColor = vec4(col, alpha);
        }
      `,
    })
  }, [props.dayRef])

  useFrame((_, dt) => {
    day.current = damp(day.current, props.dayRef.current, 3.2, dt)
    const mat = meshRef.current?.material
    if (mat && mat instanceof THREE.ShaderMaterial) {
      mat.uniforms.uTime.value += dt
      mat.uniforms.uDay.value = day.current
    }
  })

  return <mesh geometry={geometry} material={material} ref={meshRef} />
}
