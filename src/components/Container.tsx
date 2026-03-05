import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

const sizeClass = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
} as const;

export function Container({ className, size = "lg", ...props }: Props) {
  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClass[size], className)}
      {...props}
    />
  );
}

