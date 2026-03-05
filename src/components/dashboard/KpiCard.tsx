import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

export default function KpiCard({
  label,
  value,
  hint,
  icon: Icon,
  accent,
}: {
  label: string
  value: string
  hint?: string
  icon: LucideIcon
  accent: "cyan" | "indigo" | "emerald"
}) {
  const accentClass =
    accent === "cyan"
      ? "from-cyan-300/25 via-cyan-400/10 to-transparent"
      : accent === "indigo"
        ? "from-indigo-300/25 via-indigo-400/10 to-transparent"
        : "from-emerald-300/25 via-emerald-400/10 to-transparent"

  const iconClass =
    accent === "cyan"
      ? "text-cyan-200"
      : accent === "indigo"
        ? "text-indigo-200"
        : "text-emerald-200"

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_12px_50px_-30px_rgba(0,0,0,0.8)] backdrop-blur">
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br", accentClass)} />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-medium tracking-wide text-white/55">{label}</div>
          <div className="mt-2 truncate text-2xl font-semibold text-white [font-variant-numeric:tabular-nums]">
            {value}
          </div>
          {hint ? <div className="mt-2 text-xs text-white/50">{hint}</div> : null}
        </div>

        <div
          className={cn(
            "grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5",
            iconClass,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  )
}

