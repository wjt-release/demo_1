import type { ReactNode } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export default function Empty({
  title = "敬请期待",
  description = "页面正在打磨中，先去逛逛新品与热销吧。",
  action,
  className,
}: Props) {
  return (
    <div className={cn("flex min-h-[60vh] items-center justify-center px-4", className)}>
      <div className="w-full max-w-md rounded-2xl border border-border bg-bg/70 p-8 shadow-soft backdrop-blur">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-white/60">
            <Clock className="h-5 w-5 text-navy/80" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-2xl leading-tight tracking-wide text-fg">
              {title}
            </div>
            <div className="mt-2 text-sm leading-relaxed text-muted">{description}</div>
          </div>
        </div>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
    </div>
  );
}
