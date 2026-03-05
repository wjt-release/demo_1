import { useStore } from '../store/useStore';
import { Moon, Sun, Layers, Info } from 'lucide-react';
import clsx from 'clsx';

export const UI = () => {
  const { isNight, showContours, toggleNight, toggleContours } = useStore();

  return (
    <div className="absolute top-4 left-4 z-10 flex flex-col gap-4">
      <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-lg text-white">
        <h1 className="text-xl font-bold mb-2 font-display">Mountain Viewer</h1>
        <p className="text-sm opacity-80 mb-4">Interactive 3D Landscape</p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={toggleNight}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
              isNight 
                ? "bg-indigo-900/80 hover:bg-indigo-800 text-indigo-100" 
                : "bg-orange-100/80 hover:bg-orange-200 text-orange-900"
            )}
          >
            {isNight ? <Moon size={18} /> : <Sun size={18} />}
            <span>{isNight ? "Night Mode" : "Day Mode"}</span>
          </button>

          <button
            onClick={toggleContours}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 border",
              showContours
                ? "bg-emerald-600/80 border-emerald-500 text-white"
                : "bg-white/5 border-white/10 hover:bg-white/10 text-white/80"
            )}
          >
            <Layers size={18} />
            <span>{showContours ? "Hide Contours" : "Show Contours"}</span>
          </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-sm p-3 rounded-lg border border-white/10 text-xs text-white/60 max-w-[200px]">
        <div className="flex items-start gap-2">
          <Info size={14} className="mt-0.5 shrink-0" />
          <p>Drag to rotate. Scroll to zoom. Use controls above to toggle features.</p>
        </div>
      </div>
    </div>
  );
};
