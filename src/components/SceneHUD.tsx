import { useEffect, useMemo, useState } from "react";
import { Map, Mountain, RefreshCw, SunMoon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSceneStore } from "@/state/useSceneStore";

function formatClock(time01: number) {
  const total = Math.floor(((time01 % 1) + 1) % 1 * 24 * 60);
  const hh = String(Math.floor(total / 60)).padStart(2, "0");
  const mm = String(total % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

function Toggle({ on, label, onChange }: { on: boolean; label: string; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className={cn(
        "group inline-flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm",
        "transition-colors",
        on
          ? "border-white/15 bg-white/10 text-white"
          : "border-white/10 bg-white/[0.06] text-white/80 hover:bg-white/[0.08]",
      )}
    >
      <span className="truncate">{label}</span>
      <span
        className={cn(
          "relative h-5 w-9 rounded-full transition-colors",
          on ? "bg-white/50" : "bg-white/15",
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow-sm transition-transform",
            on ? "translate-x-[18px]" : "translate-x-[2px]",
          )}
        />
      </span>
    </button>
  );
}

function Slider({
  value,
  min,
  max,
  step,
  label,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  label: string;
  onChange: (v: number) => void;
}) {
  return (
    <label className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-white/85">{label}</span>
        <span className="text-xs tabular-nums text-white/55">{value.toFixed(2)}</span>
      </div>
      <input
        className="h-2 w-full cursor-pointer accent-white/70"
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function SceneHUD() {
  const time01 = useSceneStore((s) => s.time01);
  const autoCycle = useSceneStore((s) => s.autoCycle);
  const showContours = useSceneStore((s) => s.showContours);
  const contourDensity = useSceneStore((s) => s.contourDensity);
  const contourStrength = useSceneStore((s) => s.contourStrength);
  const fogAmount = useSceneStore((s) => s.fogAmount);
  const quality = useSceneStore((s) => s.quality);

  const setTime01 = useSceneStore((s) => s.setTime01);
  const setAutoCycle = useSceneStore((s) => s.setAutoCycle);
  const setShowContours = useSceneStore((s) => s.setShowContours);
  const setContourDensity = useSceneStore((s) => s.setContourDensity);
  const setContourStrength = useSceneStore((s) => s.setContourStrength);
  const setFogAmount = useSceneStore((s) => s.setFogAmount);
  const setQuality = useSceneStore((s) => s.setQuality);
  const reseed = useSceneStore((s) => s.reseed);
  const resetView = useSceneStore((s) => s.resetView);

  const clock = useMemo(() => formatClock(time01), [time01]);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), 3200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className={cn(
          "absolute left-6 top-6 z-10 grid gap-3",
          "w-[360px] max-w-[calc(100vw-48px)]",
        )}
      >
        <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/25 px-4 py-3 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="grid gap-1">
              <div className="flex items-center gap-2 text-white">
                <Mountain className="h-4 w-4" />
                <span className="text-sm font-medium tracking-wide">ALPINE RIDGE / CARTO</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/55">
                <SunMoon className="h-3.5 w-3.5" />
                <span className="tabular-nums">{clock}</span>
                <span className="text-white/25">·</span>
                <span>{autoCycle ? "自动昼夜" : "手动时间"}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => resetView()}
              className={cn(
                "pointer-events-auto inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06]",
                "px-3 py-2 text-sm text-white/85 transition-colors hover:bg-white/[0.1]",
              )}
            >
              <RefreshCw className="h-4 w-4" />
              重置
            </button>
          </div>
        </div>

        <div className="pointer-events-auto grid gap-3 rounded-2xl border border-white/10 bg-black/25 p-3 backdrop-blur">
          <label className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm text-white/85">时间</span>
              <span className="text-xs tabular-nums text-white/55">{clock}</span>
            </div>
            <input
              className="h-2 w-full cursor-pointer accent-white/70"
              type="range"
              value={time01}
              min={0}
              max={1}
              step={0.001}
              onChange={(e) => {
                setAutoCycle(false);
                setTime01(Number(e.target.value));
              }}
            />
            <div className="flex flex-wrap items-center gap-2">
              <Toggle on={autoCycle} label="自动循环" onChange={setAutoCycle} />
              <button
                type="button"
                onClick={() => reseed()}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-sm",
                  "text-white/80 transition-colors hover:bg-white/[0.1]",
                )}
              >
                <Map className="h-4 w-4" />
                换一座山
              </button>
            </div>
          </label>

          <div className="grid gap-3">
            <Toggle on={showContours} label="等高线" onChange={setShowContours} />
            {showContours ? (
              <div className="grid gap-3">
                <Slider
                  value={contourDensity}
                  min={0.8}
                  max={7.8}
                  step={0.05}
                  label="等高线密度"
                  onChange={setContourDensity}
                />
                <Slider
                  value={contourStrength}
                  min={0}
                  max={1}
                  step={0.02}
                  label="等高线强度"
                  onChange={setContourStrength}
                />
              </div>
            ) : null}
            <Slider value={fogAmount} min={0} max={1} step={0.02} label="雾效" onChange={setFogAmount} />
            <label className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm text-white/85">画质</span>
                <span className="text-xs text-white/55">{quality}</span>
              </div>
              <select
                className="h-9 w-full rounded-xl border border-white/10 bg-black/30 px-3 text-sm text-white/85"
                value={quality}
                onChange={(e) => setQuality(e.target.value as "auto" | "high" | "low")}
              >
                <option value="auto">auto</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-6 left-1/2 -translate-x-1/2",
          "pointer-events-none select-none",
        )}
      >
        <div
          className={cn(
            "rounded-full border border-white/10 bg-black/25 px-4 py-2 text-xs text-white/65 backdrop-blur",
            hint ? "opacity-100" : "opacity-0",
            "transition-opacity duration-700",
          )}
        >
          拖动旋转 · 滚轮/双指缩放 · 右上角可重置视角
        </div>
      </div>
    </div>
  );
}

