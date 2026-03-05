import './App.css'
import { useMemo, useRef, useState } from 'react'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { SceneCanvas, type SceneSettings } from './scene/SceneCanvas'
import { Overlay } from './ui/Overlay'

function App() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null)
  const [playing, setPlaying] = useState(true)
  const [speed, setSpeed] = useState(0.75)
  const [timeInput, setTimeInput] = useState(0.12)
  const [timeInputNonce, setTimeInputNonce] = useState(0)
  const [hudTime, setHudTime] = useState(timeInput)

  const [contoursEnabled, setContoursEnabled] = useState(true)
  const [contourDensity, setContourDensity] = useState(14)
  const [fogStrength, setFogStrength] = useState(0.62)
  const [quality, setQuality] = useState<'high' | 'low'>('high')

  const settings: SceneSettings = useMemo(
    () => ({
      playing,
      speed,
      timeInput,
      timeInputNonce,
      contoursEnabled,
      contourDensity,
      fogStrength,
      quality,
      onHudTime: setHudTime,
      controlsRef,
    }),
    [
      playing,
      speed,
      timeInput,
      timeInputNonce,
      contoursEnabled,
      contourDensity,
      fogStrength,
      quality,
    ],
  )

  return (
    <div className="app">
      <SceneCanvas settings={settings} />
      <Overlay
        playing={playing}
        onTogglePlaying={() => setPlaying((v) => !v)}
        speed={speed}
        onSpeedChange={setSpeed}
        time={playing ? hudTime : timeInput}
        onTimeChange={(v) => {
          setTimeInput(v)
          setHudTime(v)
          setTimeInputNonce((n) => n + 1)
        }}
        contoursEnabled={contoursEnabled}
        onToggleContours={() => setContoursEnabled((v) => !v)}
        contourDensity={contourDensity}
        onContourDensityChange={setContourDensity}
        fogStrength={fogStrength}
        onFogStrengthChange={setFogStrength}
        quality={quality}
        onToggleQuality={() => setQuality((q) => (q === 'high' ? 'low' : 'high'))}
        onResetView={() => controlsRef.current?.reset()}
      />
    </div>
  )
}

export default App
