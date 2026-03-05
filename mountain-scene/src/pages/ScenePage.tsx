import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MountainCanvas, { type SceneParams } from '../scene/MountainCanvas'
import Hud from '../ui/Hud'

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export default function ScenePage() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState(0.45)
  const [timeOfDay, setTimeOfDay] = useState(18.2)
  const [showContours, setShowContours] = useState(false)
  const [contourDensity, setContourDensity] = useState(12)
  const [resetSeq, setResetSeq] = useState(0)
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isPlaying || speed <= 0) return
    const tick = (now: number) => {
      const last = lastRef.current ?? now
      lastRef.current = now
      const dt = Math.min(0.05, (now - last) / 1000)
      setTimeOfDay((t) => (t + dt * speed * 1.8) % 24)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastRef.current = null
    }
  }, [isPlaying, speed])

  const params: SceneParams = useMemo(
    () => ({
      isPlaying,
      speed,
      timeOfDay: clamp(timeOfDay, 0, 24),
      showContours,
      contourDensity: clamp(contourDensity, 4, 22),
      resetSeq,
    }),
    [isPlaying, speed, timeOfDay, showContours, contourDensity, resetSeq],
  )

  return (
    <div className="appShell">
      <MountainCanvas params={params} />
      <Hud
        params={params}
        setIsPlaying={setIsPlaying}
        setSpeed={setSpeed}
        setTimeOfDay={setTimeOfDay}
        setShowContours={setShowContours}
        setContourDensity={setContourDensity}
        onResetView={() => setResetSeq((n) => n + 1)}
        helpLink={<Link to="/help">说明</Link>}
      />
    </div>
  )
}
