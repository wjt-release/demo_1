import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { type SceneParams } from '../scene/MountainCanvas'

const fmt = (t: number) => {
  const h = Math.floor(t) % 24
  const m = Math.floor((t - Math.floor(t)) * 60)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export default function Hud({
  params,
  setIsPlaying,
  setSpeed,
  setTimeOfDay,
  setShowContours,
  setContourDensity,
  helpLink,
  onResetView,
}: {
  params: SceneParams
  setIsPlaying: (v: boolean) => void
  setSpeed: (v: number) => void
  setTimeOfDay: (v: number) => void
  setShowContours: (v: boolean) => void
  setContourDensity: (v: number) => void
  helpLink: ReactNode
  onResetView?: () => void
}) {
  const mode = useMemo(() => {
    if (params.timeOfDay < 5.5 || params.timeOfDay > 20.2) return '夜'
    if (params.timeOfDay < 7.2) return '晨'
    if (params.timeOfDay > 18.2) return '暮'
    return '昼'
  }, [params.timeOfDay])

  return (
    <div className="hud">
      <div className="hudTop">
        <div className="hudBrand">
          <div className="hudBadge">{mode}</div>
          <div className="hudName">
            <div className="hudKicker">等高 · 河谷 · 断层</div>
            <div className="hudTitle">山脉场景</div>
          </div>
        </div>
        <div className="hudLinks">{helpLink}</div>
      </div>

      <div className="hudPanel">
        <div className="hudRow">
          <div className="hudLabel">时间</div>
          <div className="hudValue">{fmt(params.timeOfDay)}</div>
        </div>
        <input
          className="hudRange"
          type="range"
          min={0}
          max={24}
          step={0.01}
          value={params.timeOfDay}
          onChange={(e) => setTimeOfDay(Number(e.target.value))}
        />

        <div className="hudRow hudButtons">
          <button
            className="hudBtn"
            type="button"
            onClick={() => setIsPlaying(!params.isPlaying)}
          >
            {params.isPlaying ? '暂停' : '播放'}
          </button>
          <button className="hudBtn" type="button" onClick={onResetView}>
            复位
          </button>
          <button
            className={`hudBtn ${params.showContours ? 'isOn' : ''}`}
            type="button"
            onClick={() => setShowContours(!params.showContours)}
          >
            等高线
          </button>
        </div>

        <div className="hudRow">
          <div className="hudLabel">速度</div>
          <div className="hudValue">{params.speed.toFixed(2)}×</div>
        </div>
        <input
          className="hudRange"
          type="range"
          min={0}
          max={1.2}
          step={0.01}
          value={params.speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />

        <div className="hudRow">
          <div className="hudLabel">等高线密度</div>
          <div className="hudValue">{Math.round(params.contourDensity)}</div>
        </div>
        <input
          className="hudRange"
          type="range"
          min={4}
          max={22}
          step={1}
          value={params.contourDensity}
          disabled={!params.showContours}
          onChange={(e) => setContourDensity(Number(e.target.value))}
        />
      </div>

      <div className="hudHint">
        <span>拖动旋转</span>
        <span>滚轮缩放</span>
        <span>右键平移</span>
      </div>
    </div>
  )
}
