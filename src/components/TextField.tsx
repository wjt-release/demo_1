import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: ReactNode;
  error?: string;
};

export function TextField({ className, label, hint, error, id, ...props }: Props) {
  const autoId = useId();
  const inputId = id ?? `${props.name ?? "field"}-${autoId}`;

  return (
    <label className="block">
      {label ? (
        <div className="mb-2 text-xs font-medium tracking-wide text-fg/80">{label}</div>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-xl border bg-bg px-3 text-sm text-fg placeholder:text-muted",
          "border-border focus:border-navy/40 focus:outline-none focus:ring-2 focus:ring-navy/20",
          error ? "border-red-500/60 focus:border-red-500/70 focus:ring-red-500/15" : null,
          className,
        )}
        {...props}
      />
      {error ? (
        <div className="mt-2 text-xs font-medium text-red-600">{error}</div>
      ) : hint ? (
        <div className="mt-2 text-xs text-muted">{hint}</div>
      ) : null}
    </label>
  );
}
