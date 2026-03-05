import { useEffect, useState } from "react";
import { X, TicketPercent } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";

const STORAGE_KEY = "noir_new_user_seen_v1";

export function useNewUserModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  };

  return { open, close };
}

export function NewUserModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [dontShowAgain, setDontShowAgain] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-bg shadow-float">
        <div className="absolute inset-0 bg-[radial-gradient(700px_450px_at_20%_0%,rgba(216,199,172,0.22),transparent_55%),radial-gradient(700px_450px_at_100%_20%,rgba(19,36,63,0.14),transparent_60%)]" />
        <div className="relative p-6">
          <button
            type="button"
            onClick={() => {
              if (dontShowAgain) localStorage.setItem(STORAGE_KEY, "1");
              onClose();
            }}
            className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-bg/70 text-fg/70 transition-colors hover:bg-fg/5 hover:text-fg"
            aria-label="关闭"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/60">
              <TicketPercent className="h-5 w-5 text-navy/80" />
            </div>
            <div className="min-w-0">
              <div className="text-xs tracking-[0.32em] text-muted">NEW USER</div>
              <div className="mt-2 font-display text-3xl tracking-wide text-fg">新人专享</div>
              <div className="mt-2 text-sm leading-relaxed text-muted">
                领取新人礼遇（Mock）。现在去逛新品与热销，体验简洁下单与一键支付。
              </div>
            </div>
          </div>

          <label className="mt-6 flex items-center gap-3 text-sm text-fg/75">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="h-4 w-4 accent-navy"
            />
            不再提示
          </label>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link to="/products" onClick={() => (dontShowAgain ? localStorage.setItem(STORAGE_KEY, "1") : null)}>
              <Button size="lg" className="w-full">
                去逛新品
              </Button>
            </Link>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                if (dontShowAgain) localStorage.setItem(STORAGE_KEY, "1");
                onClose();
              }}
            >
              稍后再说
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

