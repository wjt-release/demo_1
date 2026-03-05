import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import { useFrame } from '@react-three/fiber'
import { damp } from '../lib/damp'

export function SkyDome(props: { sunDir: THREE.Vector3; dayRef: MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const day = useRef(props.dayRef.current)
  const sun = useRef(props.sunDir.clone())

  const geometry = useMemo(() => new THREE.SphereGeometry(160, 48, 32), [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uSunDir: { value: new THREE.Vector3(0, 1, 0) },
        uDay: { value: props.dayRef.current },
        uTime: { value: 0 },
        uZenithDay: { value: new THREE.Color('#62b8ff') },
        uHorizonDay: { value: new THREE.Color('#ffd39b') },
        uZenithNight: { value: new THREE.Color('#070a19') },
        uHorizonNight: { value: new THREE.Color('#0b2440') },
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vDir = normalize(wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        varying vec3 vDir;
        uniform vec3 uSunDir;
        uniform float uDay;
        uniform float uTime;
        uniform vec3 uZenithDay;
        uniform vec3 uHorizonDay;
        uniform vec3 uZenithNight;
        uniform vec3 uHorizonNight;

        float hash(vec2 p){
          p = fract(p * vec2(123.34, 456.21));
          p += dot(p, p + 34.345);
          return fract(p.x * p.y);
        }

        void main() {
          float h = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
          float horizon = pow(1.0 - h, 2.4);
          vec3 dayCol = mix(uHorizonDay, uZenithDay, pow(h, 0.72));
          vec3 nightCol = mix(uHorizonNight, uZenithNight, pow(h, 0.85));

          float sunDot = max(0.0, dot(vDir, normalize(uSunDir)));
          float sunGlow = pow(sunDot, 180.0) + pow(sunDot, 28.0) * 0.08;
          vec3 sunTint = vec3(1.0, 0.92, 0.82) * sunGlow;
          vec3 dusk = vec3(1.0, 0.42, 0.22) * pow(sunDot, 22.0) * (1.0 - h) * 0.6;

          float starsGate = smoothstep(0.55, 0.18, uDay);
          float s = pow(max(0.0, 1.0 - h), 0.6);
          float starField = 0.0;
          vec2 sp = normalize(vDir).xz * 260.0;
          float r = hash(floor(sp));
          float tw = sin(uTime * 0.9 + r * 6.28318) * 0.5 + 0.5;
          starField = step(0.9952, r) * (0.6 + tw * 0.7) * s;
          vec3 stars = vec3(starField) * vec3(0.9, 0.95, 1.0);

          vec3 col = mix(nightCol, dayCol, uDay);
          col += stars * starsGate;
          col += sunTint * uDay;
          col += dusk * smoothstep(0.0, 0.55, uDay);
          col += horizon * mix(vec3(0.02, 0.06, 0.09), vec3(0.12, 0.09, 0.08), uDay);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
    })
  }, [props.dayRef])

  useFrame((_, dt) => {
    day.current = damp(day.current, props.dayRef.current, 2.6, dt)
    sun.current.lerp(props.sunDir, 1 - Math.exp(-6 * dt))
    const mat = meshRef.current?.material
    if (mat && mat instanceof THREE.ShaderMaterial) {
      mat.uniforms.uDay.value = day.current
      mat.uniforms.uSunDir.value.copy(sun.current)
      mat.uniforms.uTime.value += dt
    }
  })

  return <mesh ref={meshRef} geometry={geometry} material={material} />
}
