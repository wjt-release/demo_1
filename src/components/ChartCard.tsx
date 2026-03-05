import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export function ChartCard({
  title,
  subtitle,
  right,
  children,
  className,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold tracking-tight text-white">{title}</div>
          {subtitle ? <div className="mt-0.5 text-xs text-white/55">{subtitle}</div> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </header>
      <div className="px-2 py-2 sm:px-4 sm:py-3">{children}</div>
    </section>
  )
}

