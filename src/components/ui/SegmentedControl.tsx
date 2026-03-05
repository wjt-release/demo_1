import { cn } from "@/lib/utils"

export type SegmentedOption<T extends string> = {
  value: T
  label: string
}

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  className,
}: {
  value: T
  options: SegmentedOption<T>[]
  onChange: (value: T) => void
  className?: string
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.03] p-1",
        className,
      )}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "rounded-xl px-3 py-1.5 text-xs font-medium tracking-tight transition",
              active
                ? "bg-white/[0.10] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]"
                : "text-white/70 hover:text-white hover:bg-white/[0.05]",
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

