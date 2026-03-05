import { OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { useEffect, useMemo, useRef } from 'react'
import { MathUtils, Vector3 } from 'three'
import LightingRig from './LightingRig'
import River from './River'
import Terrain from './Terrain'

export type SceneParams = {
  isPlaying: boolean
  speed: number
  timeOfDay: number
  showContours: boolean
  contourDensity: number
  resetSeq?: number
}

function CameraRig({ resetSeq }: { resetSeq?: number }) {
  const { camera, controls } = useThree()
  const homePos = useMemo(() => new Vector3(34, 22, 34), [])
  const homeLook = useMemo(() => new Vector3(0, 4, 0), [])
  const progress = useRef(1)
  const startPos = useRef(new Vector3())
  const startLook = useRef(new Vector3())
  const seq = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (resetSeq === undefined) return
    seq.current = resetSeq
    progress.current = 0
    startPos.current.copy(camera.position)
    const target = (controls as { target?: Vector3 } | undefined)?.target
    startLook.current.copy(target ?? homeLook)
  }, [camera, controls, homeLook, resetSeq])

  useFrame((_, dt) => {
    if (resetSeq === undefined) return
    if (seq.current !== resetSeq) return
    progress.current = MathUtils.damp(progress.current, 1, 7, dt)
    const t = progress.current
    camera.position.lerpVectors(startPos.current, homePos, t)
    const target = (controls as { target?: Vector3 } | undefined)?.target
    if (target) target.lerpVectors(startLook.current, homeLook, t)
    if (t > 0.999) seq.current = undefined
  })

  return null
}

export default function MountainCanvas({ params }: { params: SceneParams }) {
  return (
    <div className="canvasWrap">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [34, 22, 34], fov: 48, near: 0.1, far: 500 }}
        gl={{ antialias: true, alpha: false }}
      >
        <CameraRig resetSeq={params.resetSeq} />
        <LightingRig params={{ timeOfDay: params.timeOfDay }} />

        <group position={[0, -0.2, 0]}>
          <Terrain
            params={{
              showContours: params.showContours,
              contourDensity: params.contourDensity,
              timeOfDay: params.timeOfDay,
            }}
          />
          <River params={{ timeOfDay: params.timeOfDay }} />
        </group>

        <OrbitControls
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.65}
          minDistance={12}
          maxDistance={115}
          maxPolarAngle={Math.PI * 0.495}
          makeDefault
        />

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.18} luminanceThreshold={0.35} luminanceSmoothing={0.5} />
          <Vignette offset={0.22} darkness={0.75} />
          <Noise opacity={0.03} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
