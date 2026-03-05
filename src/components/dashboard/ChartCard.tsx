import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

export default function ChartCard({
  title,
  subtitle,
  right,
  className,
  children,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_12px_50px_-30px_rgba(0,0,0,0.8)] backdrop-blur",
        "transition-transform duration-300 ease-out hover:-translate-y-[1px]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/10 blur-2xl" />
        <div className="absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-2xl" />
      </div>

      <header className="relative mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold tracking-wide text-white/90">{title}</div>
          {subtitle ? <div className="mt-1 text-xs text-white/55">{subtitle}</div> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </header>

      <div className="relative">{children}</div>
    </section>
  )
}

