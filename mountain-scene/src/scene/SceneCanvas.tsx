import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { clamp01, damp, lerp, smoothstep } from '../lib/damp'
import { River } from './River'
import { SkyDome } from './SkyDome'
import { Terrain } from './Terrain'
import { generateTerrain } from './terrainGen'
import { makeSeed } from './noise'

export type SceneSettings = {
  playing: boolean
  speed: number
  timeInput: number
  timeInputNonce: number
  contoursEnabled: boolean
  contourDensity: number
  fogStrength: number
  quality: 'high' | 'low'
  onHudTime: (t: number) => void
  controlsRef: MutableRefObject<OrbitControlsImpl | null>
}

function World({ settings }: { settings: SceneSettings }) {
  const sunLight = useRef<THREE.DirectionalLight | null>(null)
  const moonLight = useRef<THREE.DirectionalLight | null>(null)
  const hemi = useRef<THREE.HemisphereLight | null>(null)
  const controls = useRef<OrbitControlsImpl | null>(null)

  const sunDir = useRef(new THREE.Vector3(0.6, 0.8, 0.2))
  const dayAmount = useRef(1)
  const fogDensity = useRef(0.02)
  const hudAccumulator = useRef(0)
  const timeRef = useRef(settings.timeInput)

  const bundle = useMemo(() => generateTerrain(makeSeed(), 44, 200), [])

  useEffect(() => {
    settings.controlsRef.current = controls.current
  }, [settings.controlsRef])

  useEffect(() => {
    timeRef.current = settings.timeInput
  }, [settings.timeInputNonce])

  const { scene } = useThree()

  useFrame((_, dt) => {
    if (settings.playing) {
      timeRef.current = (timeRef.current + dt * settings.speed * 0.022) % 1
    } else {
      timeRef.current = settings.timeInput
    }

    hudAccumulator.current += dt
    if (hudAccumulator.current > 0.12) {
      hudAccumulator.current = 0
      settings.onHudTime(timeRef.current)
    }

    const theta = (timeRef.current - 0.24) * Math.PI * 2
    const rawSunDir = new THREE.Vector3(Math.cos(theta), Math.sin(theta) * 0.92, Math.sin(theta) * 0.55).normalize()
    sunDir.current.lerp(rawSunDir, 1 - Math.exp(-5 * dt))

    const dayTarget = smoothstep(-0.08, 0.12, sunDir.current.y)
    dayAmount.current = damp(dayAmount.current, dayTarget, 2.8, dt)

    const sunElev = clamp01((sunDir.current.y + 0.08) / 1.08)
    const warmth = 1 - smoothstep(0.18, 0.7, sunElev)
    const sunColor = new THREE.Color('#fff7e7').lerp(new THREE.Color('#ffb16e'), warmth)
    const moonColor = new THREE.Color('#a8d9ff')

    if (sunLight.current) {
      sunLight.current.position.copy(sunDir.current).multiplyScalar(80)
      sunLight.current.intensity = lerp(0.05, 2.45, dayAmount.current)
      sunLight.current.color.copy(sunColor)
    }
    if (moonLight.current) {
      moonLight.current.position.copy(sunDir.current).multiplyScalar(-60)
      moonLight.current.intensity = lerp(0.55, 0.02, dayAmount.current)
      moonLight.current.color.copy(moonColor)
    }
    if (hemi.current) {
      hemi.current.intensity = lerp(0.2, 0.78, dayAmount.current)
    }

    const fogTarget = lerp(0.012, 0.038, clamp01(settings.fogStrength)) * lerp(1.15, 0.82, dayAmount.current)
    fogDensity.current = damp(fogDensity.current, fogTarget, 2.2, dt)

    const fogDay = new THREE.Color('#a6c8d6')
    const fogNight = new THREE.Color('#081023')
    const fogCol = fogNight.clone().lerp(fogDay, dayAmount.current)

    if (!scene.fog) {
      scene.fog = new THREE.FogExp2(fogCol, fogDensity.current)
    } else if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.density = fogDensity.current
      scene.fog.color.copy(fogCol)
    }
  })

  return (
    <>
      <SkyDome sunDir={sunDir.current} dayRef={dayAmount} />

      <hemisphereLight ref={hemi} args={['#bcd6ff', '#0b1a17', 0.65]} />
      <directionalLight
        ref={sunLight}
        castShadow
        shadow-mapSize-width={settings.quality === 'high' ? 2048 : 1024}
        shadow-mapSize-height={settings.quality === 'high' ? 2048 : 1024}
        shadow-camera-near={1}
        shadow-camera-far={150}
        shadow-camera-left={-38}
        shadow-camera-right={38}
        shadow-camera-top={38}
        shadow-camera-bottom={-38}
      />
      <directionalLight ref={moonLight} />

      <group position={[0, 0, 0]}>
        <Terrain bundle={bundle} contoursEnabled={settings.contoursEnabled} contourDensity={settings.contourDensity} />
        <River curve={bundle.riverCurve} dayRef={dayAmount} />
      </group>

      <mesh rotation-x={-Math.PI / 2} position={[0, -8.8, 0]} receiveShadow>
        <circleGeometry args={[120, 64]} />
        <meshStandardMaterial color={'#0a121c'} roughness={1} metalness={0} />
      </mesh>

      <OrbitControls
        ref={controls}
        makeDefault
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.65}
        panSpeed={0.75}
        minDistance={8}
        maxDistance={46}
        minPolarAngle={0.18}
        maxPolarAngle={Math.PI / 2.05}
        target={[2.2, -0.3, 2.0]}
      />
    </>
  )
}

export function SceneCanvas({ settings }: { settings: SceneSettings }) {
  return (
    <div style={{ position: 'absolute', inset: 0 }} onDoubleClick={() => settings.controlsRef.current?.reset()}>
      <Canvas
        shadows
        dpr={settings.quality === 'high' ? [1, 2] : [1, 1.25]}
        gl={{ antialias: settings.quality === 'high', powerPreference: 'high-performance' }}
        camera={{ position: [20, 14, 22], fov: 42, near: 0.1, far: 220 }}
      >
        <color attach="background" args={['#07101a']} />
        <World settings={settings} />
        {settings.quality === 'high' ? (
          <EffectComposer multisampling={2}>
            <Bloom intensity={0.38} luminanceThreshold={0.55} luminanceSmoothing={0.2} mipmapBlur />
            <Vignette eskil={false} offset={0.18} darkness={0.62} />
          </EffectComposer>
        ) : null}
      </Canvas>
    </div>
  )
}
