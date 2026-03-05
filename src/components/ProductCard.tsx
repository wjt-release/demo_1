import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/commerce";
import { formatCny } from "@/utils/money";

export function ProductCard({ product }: { product: Product }) {
  const badge = product.isNew ? "NEW" : product.isHot ? "HOT" : null;

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn(
        "group block overflow-hidden rounded-2xl border border-border bg-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow",
        "hover:shadow-float",
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-white/40">
        <img
          src={product.images[0]}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.images[1] ? (
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        ) : null}
        {badge ? (
          <div className="absolute left-3 top-3 rounded-full border border-border bg-bg/70 px-3 py-1 text-[11px] tracking-[0.28em] text-fg/80 backdrop-blur">
            {badge}
          </div>
        ) : null}
      </div>
      <div className="p-4">
        <div className="max-h-[2.7em] overflow-hidden text-sm font-medium leading-snug tracking-wide text-fg">
          {product.title}
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold tracking-wide text-fg">
            {formatCny(product.price)}
          </div>
          <div className="text-xs tracking-wide text-muted">{product.colorName}</div>
        </div>
      </div>
    </Link>
  );
}
