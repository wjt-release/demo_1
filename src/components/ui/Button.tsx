import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

type Variant = "primary" | "ghost"
type Size = "sm" | "md"

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium tracking-tight transition active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-sm",
        variant === "primary" &&
          "bg-[color:var(--accent)] text-[color:var(--accent-ink)] shadow-[0_10px_28px_rgba(0,0,0,0.35)] hover:brightness-110",
        variant === "ghost" &&
          "border border-white/10 bg-white/[0.03] text-[color:var(--fg)] hover:bg-white/[0.06] hover:border-white/15",
        className,
      )}
      {...props}
    />
  )
}
