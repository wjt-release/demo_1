import './overlay.css'

function timeLabel(t: number) {
  const h = (t * 24 + 24) % 24
  if (h < 5.5) return '夜'
  if (h < 8.5) return '晨'
  if (h < 16.5) return '昼'
  if (h < 20.2) return '昏'
  return '夜'
}

function clamp(v: number, a: number, b: number) {
  return Math.min(b, Math.max(a, v))
}

export function Overlay(props: {
  playing: boolean
  onTogglePlaying: () => void
  speed: number
  onSpeedChange: (v: number) => void
  time: number
  onTimeChange: (v: number) => void
  contoursEnabled: boolean
  onToggleContours: () => void
  contourDensity: number
  onContourDensityChange: (v: number) => void
  fogStrength: number
  onFogStrengthChange: (v: number) => void
  quality: 'high' | 'low'
  onToggleQuality: () => void
  onResetView: () => void
}) {
  const phase = timeLabel(props.time)

  return (
    <div className="overlay">
      <div className="brand">
        <div className="title">山脉切面</div>
        <div className="subtitle">
          <span className="phase">{phase}</span>
          <span className="dot" />
          <span className="hint">拖动旋转 · 滚轮缩放 · 右键平移</span>
        </div>
      </div>

      <div className="panel">
        <div className="row">
          <button className="btn" onClick={props.onTogglePlaying}>
            {props.playing ? '暂停昼夜' : '播放昼夜'}
          </button>
          <button className="btn ghost" onClick={props.onResetView}>
            重置视角
          </button>
        </div>

        <div className="field">
          <div className="label">
            <span>时间</span>
            <span className="value">{Math.round(props.time * 100)}%</span>
          </div>
          <input
            className="range"
            type="range"
            min={0}
            max={1}
            step={0.001}
            value={props.time}
            onChange={(e) => props.onTimeChange(clamp(parseFloat(e.target.value), 0, 1))}
          />
        </div>

        <div className="field">
          <div className="label">
            <span>速度</span>
            <span className="value">{props.speed.toFixed(2)}×</span>
          </div>
          <input
            className="range"
            type="range"
            min={0}
            max={2}
            step={0.01}
            value={props.speed}
            onChange={(e) => props.onSpeedChange(clamp(parseFloat(e.target.value), 0, 2))}
          />
        </div>

        <div className="split">
          <button className={`chip ${props.contoursEnabled ? 'on' : ''}`} onClick={props.onToggleContours}>
            等高线
          </button>
          <button className={`chip ${props.quality === 'high' ? 'on' : ''}`} onClick={props.onToggleQuality}>
            {props.quality === 'high' ? '高画质' : '性能优先'}
          </button>
        </div>

        <div className="field">
          <div className="label">
            <span>线密度</span>
            <span className="value">{props.contourDensity}</span>
          </div>
          <input
            className="range"
            type="range"
            min={6}
            max={26}
            step={1}
            value={props.contourDensity}
            onChange={(e) => props.onContourDensityChange(parseInt(e.target.value))}
          />
        </div>

        <div className="field">
          <div className="label">
            <span>雾</span>
            <span className="value">{Math.round(props.fogStrength * 100)}%</span>
          </div>
          <input
            className="range"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={props.fogStrength}
            onChange={(e) => props.onFogStrengthChange(clamp(parseFloat(e.target.value), 0, 1))}
          />
        </div>

        <div className="legend">
          <div className="legend-label">
            <span>海拔</span>
            <span className="muted">低 → 高</span>
          </div>
          <div className="legend-bar" />
        </div>
      </div>
    </div>
  )
}

