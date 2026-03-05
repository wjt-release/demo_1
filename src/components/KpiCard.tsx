import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function KpiCard({
  label,
  value,
  sub,
  icon,
  className,
}: {
  label: string
  value: string
  sub?: string
  icon?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur",
        className,
      )}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
      </div>
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium tracking-wide text-white/60">{label}</div>
          <div className="mt-2 font-mono text-2xl font-semibold tracking-tight text-white">{value}</div>
          {sub ? <div className="mt-1 text-xs text-white/55">{sub}</div> : null}
        </div>
        {icon ? (
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/80">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  )
}

