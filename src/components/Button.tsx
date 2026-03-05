import type { ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-fg text-bg hover:bg-fg/90 active:bg-fg/85 shadow-soft border border-fg/10",
  secondary:
    "bg-transparent text-fg border border-border hover:bg-fg/5 active:bg-fg/8",
  ghost: "bg-transparent text-fg hover:bg-fg/5 active:bg-fg/8 border border-transparent",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = "primary", size = "md", type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-wide transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/35 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    />
  );
});
