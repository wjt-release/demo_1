import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { MathUtils, Mesh, MeshStandardMaterial, PlaneGeometry } from 'three'
import { WORLD, heightAt } from './world'

export type TerrainParams = {
  showContours: boolean
  contourDensity: number
  timeOfDay: number
}

type TerrainShader = {
  uniforms: Record<string, { value: unknown }>
}

const buildGeometry = () => {
  const g = new PlaneGeometry(WORLD.size, WORLD.size, WORLD.segments, WORLD.segments)
  g.rotateX(-Math.PI / 2)
  const pos = g.attributes.position
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    pos.setY(i, heightAt(x, z))
  }
  pos.needsUpdate = true
  g.computeVertexNormals()
  return g
}

const buildMaterial = () => {
  const m = new MeshStandardMaterial({
    color: '#ffffff',
    roughness: 0.92,
    metalness: 0.0,
  })

  m.customProgramCacheKey = () => 'terrain-v1'

  m.onBeforeCompile = (shader) => {
    const s = shader as unknown as TerrainShader

    s.uniforms.uContours = { value: 0 }
    s.uniforms.uContourScale = { value: 1.2 }
    s.uniforms.uContourThickness = { value: 0.09 }
    s.uniforms.uContourStrength = { value: 0.42 }
    s.uniforms.uTimeOfDay = { value: 12 }

    s.uniforms.uRiverA = { value: WORLD.river.a }
    s.uniforms.uRiverB = { value: WORLD.river.b }
    s.uniforms.uRiverF1 = { value: WORLD.river.f1 }
    s.uniforms.uRiverF2 = { value: WORLD.river.f2 }
    s.uniforms.uRiverWidth = { value: WORLD.river.width }

    m.userData.shader = s

    shader.vertexShader = shader.vertexShader
      .replace(
        'void main() {',
        [
          'varying vec3 vWorldPos;',
          'varying vec3 vWorldNormal;',
          'void main() {',
        ].join('\n'),
      )
      .replace(
        '#include <worldpos_vertex>',
        [
          '#include <worldpos_vertex>',
          'vWorldPos = worldPosition.xyz;',
          'vWorldNormal = normalize(mat3(modelMatrix) * objectNormal);',
        ].join('\n'),
      )

    shader.fragmentShader = shader.fragmentShader
      .replace(
        'void main() {',
        [
          'varying vec3 vWorldPos;',
          'varying vec3 vWorldNormal;',
          'uniform float uContours;',
          'uniform float uContourScale;',
          'uniform float uContourThickness;',
          'uniform float uContourStrength;',
          'uniform float uTimeOfDay;',
          'uniform float uRiverA;',
          'uniform float uRiverB;',
          'uniform float uRiverF1;',
          'uniform float uRiverF2;',
          'uniform float uRiverWidth;',
          'float riverX(float z){ return uRiverA*sin(z*uRiverF1) + uRiverB*sin(z*uRiverF2 + 1.3); }',
          'float sat(float x){ return clamp(x, 0.0, 1.0); }',
          'vec3 palette(float h, float slope){',
          '  vec3 rockA = vec3(0.36, 0.37, 0.39);',
          '  vec3 rockB = vec3(0.18, 0.20, 0.24);',
          '  vec3 grass = vec3(0.16, 0.28, 0.20);',
          '  vec3 moss  = vec3(0.12, 0.22, 0.18);',
          '  vec3 snow  = vec3(0.93, 0.94, 0.96);',
          '  vec3 sand  = vec3(0.36, 0.33, 0.28);',
          '  float rockW = smoothstep(0.28, 0.9, slope);',
          '  float snowW = smoothstep(10.2, 14.8, h) * (1.0 - rockW);',
          '  float sandW = (1.0 - rockW) * (1.0 - snowW) * smoothstep(-2.5, 1.2, h);',
          '  vec3 base = mix(grass, rockA, rockW);',
          '  base = mix(base, rockB, sat((slope - 0.5) * 1.6));',
          '  base = mix(base, snow, snowW);',
          '  base = mix(base, sand, sandW);',
          '  base = mix(base, moss, (1.0 - rockW) * smoothstep(2.0, 7.5, h));',
          '  return base;',
          '}',
          'void main() {',
        ].join('\n'),
      )
      .replace(
        '#include <color_fragment>',
        [
          '#include <color_fragment>',
          'float slope = 1.0 - sat(vWorldNormal.y);',
          'vec3 albedo = palette(vWorldPos.y, slope);',
          'float cx = riverX(vWorldPos.z);',
          'float d = abs(vWorldPos.x - cx);',
          'float wet = (1.0 - smoothstep(uRiverWidth * 0.95, uRiverWidth * 1.9, d)) * (1.0 - smoothstep(2.2, 6.3, vWorldPos.y));',
          'albedo = mix(albedo, albedo * vec3(0.58, 0.72, 0.74), wet * 0.55);',
          'diffuseColor.rgb = albedo;',
          'float band = abs(fract((vWorldPos.y + 24.0) * uContourScale) - 0.5);',
          'float line = 1.0 - smoothstep(0.0, uContourThickness, band);',
          'float dusk = smoothstep(16.0, 19.0, uTimeOfDay) * (1.0 - smoothstep(20.5, 23.0, uTimeOfDay));',
          'vec3 ink = mix(vec3(0.10, 0.12, 0.14), vec3(0.18, 0.14, 0.10), dusk);',
          'diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb + ink * uContourStrength, uContours * line);',
        ].join('\n'),
      )
  }

  return m
}

export default function Terrain({ params }: { params: TerrainParams }) {
  const meshRef = useRef<Mesh>(null)
  const material = useMemo(() => buildMaterial(), [])
  const geometry = useMemo(() => buildGeometry(), [])

  useFrame((_, dt) => {
    const shader = material.userData.shader as TerrainShader | undefined
    if (!shader) return
    const u = shader.uniforms
    u.uTimeOfDay.value = params.timeOfDay
    u.uContours.value = MathUtils.damp(
      u.uContours.value as number,
      params.showContours ? 1 : 0,
      10,
      dt,
    )
    u.uContourScale.value = MathUtils.damp(
      u.uContourScale.value as number,
      params.contourDensity * 0.11,
      9,
      dt,
    )
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} receiveShadow castShadow />
  )
}

