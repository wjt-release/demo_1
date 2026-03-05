import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Container } from "@/components/Container";
import Empty from "@/components/Empty";
import { Button } from "@/components/Button";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { formatCny } from "@/utils/money";

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const lines = items
    .map((it) => {
      const p = products.find((x) => x.id === it.productId);
      if (!p) return null;
      return {
        key: `${it.productId}_${it.size}`,
        product: p,
        size: it.size,
        quantity: it.quantity,
        lineTotal: p.price * it.quantity,
      };
    })
    .filter(Boolean) as Array<{
    key: string;
    product: (typeof products)[number];
    size: (typeof items)[number]["size"];
    quantity: number;
    lineTotal: number;
  }>;

  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  if (!lines.length) {
    return (
      <Empty
        title="购物车为空"
        description="先去挑几件喜欢的单品，再回来结算。"
        action={
          <Link to="/products">
            <Button size="md">去逛商品</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Container className="py-10">
      <div className="text-xs tracking-[0.32em] text-muted">CART</div>
      <div className="mt-2 font-display text-3xl tracking-wide text-fg">购物车</div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          {lines.map((l) => (
            <div
              key={l.key}
              className="grid grid-cols-[96px_1fr] gap-4 rounded-2xl border border-border bg-white/40 p-4 shadow-soft"
            >
              <Link
                to={`/products/${l.product.id}`}
                className="overflow-hidden rounded-xl border border-border bg-white/50"
              >
                <img
                  src={l.product.images[0]}
                  alt={l.product.title}
                  className="h-24 w-24 object-cover"
                  loading="lazy"
                />
              </Link>

              <div className="min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      to={`/products/${l.product.id}`}
                      className="block max-w-full truncate text-sm font-medium tracking-wide text-fg hover:underline hover:underline-offset-4"
                    >
                      {l.product.title}
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-wide text-muted">
                      <span>Size: {l.size}</span>
                      <span className="h-1 w-1 rounded-full bg-border" />
                      <span>{l.product.colorName}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem({ productId: l.product.id, size: l.size })}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-bg/70 text-fg/70 transition-colors hover:bg-fg/5 hover:text-fg"
                    aria-label="移除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="inline-flex overflow-hidden rounded-full border border-border bg-bg/70">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity({ productId: l.product.id, size: l.size }, l.quantity - 1)
                      }
                      className="h-9 w-10 text-fg/70 hover:bg-fg/5 hover:text-fg"
                      aria-label="减少数量"
                    >
                      −
                    </button>
                    <div className="flex h-9 w-12 items-center justify-center text-sm font-medium text-fg">
                      {l.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity({ productId: l.product.id, size: l.size }, l.quantity + 1)
                      }
                      className="h-9 w-10 text-fg/70 hover:bg-fg/5 hover:text-fg"
                      aria-label="增加数量"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-sm font-semibold tracking-wide text-fg">
                    {formatCny(l.lineTotal)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-border bg-bg/70 p-6 shadow-soft backdrop-blur">
          <div className="text-xs tracking-[0.32em] text-muted">SUMMARY</div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="tracking-wide text-muted">小计</span>
            <span className="font-semibold tracking-wide text-fg">{formatCny(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="tracking-wide text-muted">运费</span>
            <span className="tracking-wide text-fg/80">到付（Mock）</span>
          </div>
          <div className="mt-4 h-px bg-border" />
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="tracking-wide text-muted">应付</span>
            <span className="text-base font-semibold tracking-wide text-fg">
              {formatCny(subtotal)}
            </span>
          </div>
          <div className="mt-6 grid gap-3">
            <Link to="/checkout">
              <Button size="lg" className="w-full">
                去结算
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="secondary" className="w-full">
                继续选购
              </Button>
            </Link>
          </div>
          <div className="mt-4 text-xs leading-relaxed text-muted">
            支付为 Mock：点击支付即付款完成。
          </div>
        </div>
      </div>
    </Container>
  );
}
