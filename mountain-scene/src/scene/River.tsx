import { useFrame } from '@react-three/fiber'
import { useMemo } from 'react'
import { CatmullRomCurve3, DoubleSide, MathUtils, ShaderMaterial, TubeGeometry, Vector3 } from 'three'
import { WORLD, heightAt, riverX } from './world'

export type RiverParams = {
  timeOfDay: number
}

const buildRiver = () => {
  const half = WORLD.size * 0.5
  const pts: Vector3[] = []
  const n = 140
  for (let i = 0; i <= n; i += 1) {
    const t = i / n
    const z = MathUtils.lerp(-half, half, t)
    const x = riverX(z)
    const y = heightAt(x, z) + WORLD.river.waterOffset
    pts.push(new Vector3(x, y, z))
  }
  const curve = new CatmullRomCurve3(pts, false, 'catmullrom', 0.6)
  const geom = new TubeGeometry(curve, 520, 1.25, 9, false)
  return { curve, geom }
}

const buildMaterial = () => {
  return new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uNight: { value: 0 },
      uOpacity: { value: 0.88 },
    },
    vertexShader: [
      'varying vec3 vPosW;',
      'varying vec3 vNrmW;',
      'varying vec2 vUv;',
      'void main(){',
      '  vUv = uv;',
      '  vec4 wp = modelMatrix * vec4(position, 1.0);',
      '  vPosW = wp.xyz;',
      '  vNrmW = normalize(mat3(modelMatrix) * normal);',
      '  gl_Position = projectionMatrix * viewMatrix * wp;',
      '}',
    ].join('\n'),
    fragmentShader: [
      'varying vec3 vPosW;',
      'varying vec3 vNrmW;',
      'varying vec2 vUv;',
      'uniform float uTime;',
      'uniform float uNight;',
      'uniform float uOpacity;',
      'float sat(float x){ return clamp(x, 0.0, 1.0); }',
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
      'float noise(vec2 p){',
      '  vec2 i = floor(p);',
      '  vec2 f = fract(p);',
      '  float a = hash(i);',
      '  float b = hash(i + vec2(1.0, 0.0));',
      '  float c = hash(i + vec2(0.0, 1.0));',
      '  float d = hash(i + vec2(1.0, 1.0));',
      '  vec2 u = f * f * (3.0 - 2.0 * f);',
      '  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;',
      '}',
      'void main(){',
      '  vec3 N = normalize(vNrmW);',
      '  vec3 V = normalize(cameraPosition - vPosW);',
      '  float fres = pow(1.0 - sat(dot(N, V)), 3.0);',
      '  float flow = vUv.x * 6.0 - uTime * 0.85;',
      '  float rip = noise(vec2(flow, vUv.y * 10.0 + uTime * 0.25));',
      '  float stripe = sin((vUv.y * 24.0 + rip * 2.0) + uTime * 1.2) * 0.5 + 0.5;',
      '  vec3 day = vec3(0.06, 0.42, 0.62);',
      '  vec3 night = vec3(0.05, 0.12, 0.22);',
      '  vec3 base = mix(day, night, uNight);',
      '  base += (stripe * 0.06 + rip * 0.08) * (1.0 - uNight * 0.65);',
      '  vec3 col = base + fres * mix(vec3(0.25, 0.58, 0.75), vec3(0.12, 0.22, 0.35), uNight);',
      '  float a = uOpacity + fres * 0.22;',
      '  gl_FragColor = vec4(col, a);',
      '}',
    ].join('\n'),
  })
}

const nightFactor = (t: number) => {
  const a = MathUtils.smoothstep(t, 5.2, 7.2)
  const b = 1 - MathUtils.smoothstep(t, 17.6, 19.7)
  const day = a * b
  return 1 - day
}

export default function River({ params }: { params: RiverParams }) {
  const { geom } = useMemo(() => buildRiver(), [])
  const material = useMemo(() => buildMaterial(), [])

  useFrame((state, dt) => {
    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uNight.value = MathUtils.damp(
      material.uniforms.uNight.value,
      nightFactor(params.timeOfDay),
      6,
      dt,
    )
  })

  return <mesh geometry={geom} material={material} castShadow receiveShadow />
}

