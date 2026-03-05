import { Sun, Moon, Mountain, Play, Pause } from 'lucide-react';
import { useSceneStore } from '@/store/sceneStore';

export function ControlPanel() {
  const {
    showContours,
    toggleContours,
    dayNightTime,
    setDayNightTime,
    isAutoCycle,
    toggleAutoCycle,
    cycleSpeed,
    setCycleSpeed,
  } = useSceneStore();

  const timeOfDay = getTimeOfDay(dayNightTime);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-white/10 min-w-[280px]">
        <h2 className="text-white/90 text-sm font-medium mb-4 tracking-wide uppercase">
          场景控制
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">昼夜循环</span>
            <div className="flex items-center gap-2">
              <span className="text-white/50 text-xs w-16 text-right">
                {timeOfDay}
              </span>
              <button
                onClick={toggleAutoCycle}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group"
                title={isAutoCycle ? '暂停' : '播放'}
              >
                {isAutoCycle ? (
                  <Pause className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                ) : (
                  <Play className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">时间</span>
              <span className="text-white/50 text-xs">
                {Math.round(dayNightTime * 24)}:00
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={dayNightTime}
              onChange={(e) => setDayNightTime(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer slider-thumb"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">循环速度</span>
              <span className="text-white/50 text-xs">{cycleSpeed}x</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={cycleSpeed}
              onChange={(e) => setCycleSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer slider-thumb"
            />
          </div>

          <div className="h-px bg-white/10 my-2" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-sm">等高线</span>
            </div>
            <button
              onClick={toggleContours}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                showContours
                  ? 'bg-emerald-500/80 shadow-lg shadow-emerald-500/30'
                  : 'bg-white/20'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                  showContours ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setDayNightTime(0.3)}
              className="p-2 rounded-lg bg-white/10 hover:bg-orange-500/30 transition-all duration-200 group"
              title="日出"
            >
              <Sun className="w-4 h-4 text-orange-400 group-hover:text-orange-300 transition-colors" />
            </button>
            <button
              onClick={() => setDayNightTime(0.5)}
              className="p-2 rounded-lg bg-white/10 hover:bg-sky-500/30 transition-all duration-200 group"
              title="正午"
            >
              <Sun className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
            </button>
            <button
              onClick={() => setDayNightTime(0.75)}
              className="p-2 rounded-lg bg-white/10 hover:bg-purple-500/30 transition-all duration-200 group"
              title="日落"
            >
              <Sun className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </button>
            <button
              onClick={() => setDayNightTime(0)}
              className="p-2 rounded-lg bg-white/10 hover:bg-indigo-500/30 transition-all duration-200 group"
              title="夜晚"
            >
              <Moon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeOfDay(time: number): string {
  if (time < 0.2) return '深夜';
  if (time < 0.3) return '黎明';
  if (time < 0.45) return '上午';
  if (time < 0.55) return '正午';
  if (time < 0.7) return '下午';
  if (time < 0.8) return '黄昏';
  return '夜晚';
}
