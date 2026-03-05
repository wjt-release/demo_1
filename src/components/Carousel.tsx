import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselSlide = {
  id: string;
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function Carousel({
  slides,
  autoMs = 5200,
  className,
}: {
  slides: CarouselSlide[];
  autoMs?: number;
  className?: string;
}) {
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);
  const [idx, setIdx] = useState(0);
  const hoveredRef = useRef(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const t = window.setInterval(() => {
      if (hoveredRef.current) return;
      setIdx((v) => (v + 1) % safeSlides.length);
    }, autoMs);
    return () => window.clearInterval(t);
  }, [autoMs, safeSlides.length]);

  useEffect(() => {
    if (!safeSlides.length) return;
    setIdx((v) => Math.min(v, safeSlides.length - 1));
  }, [safeSlides.length]);

  if (!safeSlides.length) return null;

  const active = safeSlides[idx];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-white/40 shadow-soft",
        className,
      )}
      onMouseEnter={() => {
        hoveredRef.current = true;
      }}
      onMouseLeave={() => {
        hoveredRef.current = false;
      }}
      onPointerDown={(e) => {
        touchStartX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (touchStartX.current == null) return;
        const dx = e.clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) < 40) return;
        if (dx < 0) setIdx((v) => (v + 1) % safeSlides.length);
        else setIdx((v) => (v - 1 + safeSlides.length) % safeSlides.length);
      }}
    >
      <div className="relative aspect-[16/9] sm:aspect-[21/9]">
        <img src={active.image} alt={active.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,10,0.62),rgba(10,10,10,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_15%_30%,rgba(216,199,172,0.12),transparent_60%)]" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6 sm:p-8">
            {active.eyebrow ? (
              <div className="text-xs tracking-[0.34em] text-white/70">{active.eyebrow}</div>
            ) : null}
            <div className="mt-3 max-w-xl font-display text-3xl leading-tight tracking-wide text-white sm:text-4xl">
              {active.title}
            </div>
            {active.subtitle ? (
              <div className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">{active.subtitle}</div>
            ) : null}
          </div>
        </div>
      </div>

      {safeSlides.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => setIdx((v) => (v - 1 + safeSlides.length) % safeSlides.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-black/25 p-2 text-white/80 backdrop-blur transition-colors hover:bg-black/35 hover:text-white"
            aria-label="上一张"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setIdx((v) => (v + 1) % safeSlides.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-black/25 p-2 text-white/80 backdrop-blur transition-colors hover:bg-black/35 hover:text-white"
            aria-label="下一张"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
            {safeSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIdx(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === idx ? "w-10 bg-white/75" : "w-4 bg-white/35 hover:bg-white/50",
                )}
                aria-label={`跳到第 ${i + 1} 张`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

