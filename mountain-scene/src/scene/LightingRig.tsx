import { Sky, Stars } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { Color, DirectionalLight, Fog, HemisphereLight, MathUtils, Vector3 } from 'three'

export type LightingParams = {
  timeOfDay: number
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))

const dayFactor = (t: number) => {
  const a = MathUtils.smoothstep(t, 5.2, 7.2)
  const b = 1 - MathUtils.smoothstep(t, 17.6, 19.7)
  return a * b
}

const sunPosFromTime = (t: number) => {
  const k = (t - 6) / 12
  const elev = Math.sin(MathUtils.clamp(k, -1, 1) * Math.PI)
  const az = 0.92
  const r = 120
  const y = elev * r
  const x = Math.cos(az) * r
  const z = Math.sin(az) * r
  return new Vector3(x, y, z)
}

export default function LightingRig({ params }: { params: LightingParams }) {
  const { scene } = useThree()
  const sunRef = useRef<DirectionalLight>(null)
  const hemiRef = useRef<HemisphereLight>(null)

  const fog = useMemo(() => new Fog('#0b1320', 28, 140), [])
  const bg = useMemo(() => new Color('#0b1320'), [])
  const sunPos = useMemo(() => new Vector3(), [])
  const tmp = useMemo(() => new Vector3(), [])

  useEffect(() => {
    scene.fog = fog
    scene.background = bg
  }, [bg, fog, scene])

  useFrame((_, dt) => {
    const d = dayFactor(params.timeOfDay)
    const night = 1 - d

    tmp.copy(sunPosFromTime(params.timeOfDay))
    sunPos.lerp(tmp, 1 - Math.exp(-dt * 6))

    const sun = sunRef.current
    if (sun) {
      sun.position.copy(sunPos)
      sun.intensity = MathUtils.damp(sun.intensity, 3.1 * d + 0.55 * night, 6, dt)
      const cDay = new Color('#ffe8c4')
      const cNight = new Color('#b8d7ff')
      sun.color.lerpColors(cNight, cDay, d)
    }

    const hemi = hemiRef.current
    if (hemi) {
      hemi.intensity = MathUtils.damp(hemi.intensity, 0.75 * d + 0.32 * night, 6, dt)
      hemi.color.lerpColors(new Color('#0d1b2f'), new Color('#bfe9ff'), d)
      hemi.groundColor.lerpColors(new Color('#0b0f14'), new Color('#33402f'), d)
    }

    const fogNear = MathUtils.lerp(20, 34, night)
    const fogFar = MathUtils.lerp(160, 120, night)
    fog.near = MathUtils.damp(fog.near, fogNear, 4, dt)
    fog.far = MathUtils.damp(fog.far, fogFar, 4, dt)

    const cDayBg = new Color('#bfe8ff')
    const cNightBg = new Color('#070a12')
    bg.lerpColors(cNightBg, cDayBg, clamp01(d * 1.05))
  })

  const d0 = dayFactor(params.timeOfDay)

  return (
    <>
      <hemisphereLight ref={hemiRef} args={['#bfe9ff', '#2c3a2a', 0.7]} />
      <directionalLight
        ref={sunRef}
        position={[40, 80, 40]}
        intensity={2.7}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={10}
        shadow-camera-far={240}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
      />

      <Sky
        distance={450000}
        sunPosition={sunPosFromTime(params.timeOfDay).toArray()}
        turbidity={MathUtils.lerp(1.6, 6.5, 1 - d0)}
        rayleigh={MathUtils.lerp(2.2, 0.35, 1 - d0)}
        mieCoefficient={MathUtils.lerp(0.005, 0.02, 1 - d0)}
        mieDirectionalG={0.82}
      />

      {d0 < 0.25 ? (
        <Stars radius={160} depth={60} count={2200} factor={3.1} saturation={0} fade speed={0.35} />
      ) : null}
    </>
  )
}
