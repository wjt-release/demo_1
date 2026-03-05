import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Ruler, Star } from "lucide-react";
import { Container } from "@/components/Container";
import Empty from "@/components/Empty";
import { Button } from "@/components/Button";
import { getProductById } from "@/data/products";
import { getReviewsByProductId } from "@/data/reviews";
import { useCartStore } from "@/stores/cartStore";
import { formatCny } from "@/utils/money";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        const active = i < Math.round(value);
        return (
          <Star
            key={i}
            className={active ? "h-4 w-4 text-fg" : "h-4 w-4 text-border"}
            fill={active ? "currentColor" : "transparent"}
          />
        );
      })}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = id ? getProductById(id) : undefined;
  const reviews = useMemo(() => (product ? getReviewsByProductId(product.id) : []), [product]);
  const avg =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(product?.sizes[1] ?? product?.sizes[0] ?? "S");
  const [showSizeInfo, setShowSizeInfo] = useState(false);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <Empty
        title="商品不存在"
        description="你访问的商品可能已下架或链接不正确。"
        action={
          <Link to="/products">
            <Button variant="secondary">返回列表</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Container className="py-10">
      <div className="mb-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm tracking-wide text-fg/75 transition-colors hover:bg-fg/5 hover:text-fg"
        >
          <ChevronLeft className="h-4 w-4" />
          返回列表
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="grid gap-4">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-white/40 shadow-soft">
            <div className="aspect-[3/4]">
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {product.images.slice(0, 5).map((src, idx) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`overflow-hidden rounded-xl border bg-white/40 transition-colors ${
                  idx === activeImage ? "border-fg/20" : "border-border hover:border-fg/15"
                }`}
              >
                <img src={src} alt="" className="aspect-square h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs tracking-[0.32em] text-muted">{product.category}</div>
          <div className="mt-3 font-display text-4xl leading-tight tracking-wide text-fg">
            {product.title}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="text-lg font-semibold tracking-wide text-fg">
              {formatCny(product.price)}
            </div>
            <div className="text-sm tracking-wide text-muted">{product.colorName}</div>
            {reviews.length ? (
              <div className="ml-auto flex items-center gap-3">
                <Stars value={avg} />
                <div className="text-xs tracking-wide text-muted">
                  {avg.toFixed(1)} · {reviews.length} 条评价
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-bg/70 p-5 shadow-soft backdrop-blur">
            <div className="text-xs tracking-[0.32em] text-muted">SIZE</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`h-10 rounded-full border px-4 text-sm tracking-wide transition-colors ${
                    size === s
                      ? "border-fg/20 bg-fg text-bg"
                      : "border-border bg-bg/70 text-fg/75 hover:bg-fg/5 hover:text-fg"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowSizeInfo((v) => !v)}
                className="ml-auto inline-flex h-10 items-center gap-2 rounded-full border border-border bg-bg/70 px-4 text-sm tracking-wide text-fg/75 transition-colors hover:bg-fg/5 hover:text-fg"
              >
                <Ruler className="h-4 w-4" />
                尺码信息
              </button>
            </div>

            {showSizeInfo ? (
              <div className="mt-5 rounded-xl border border-border bg-white/45 p-4">
                <div className="text-sm font-medium tracking-wide text-fg">尺码建议（参考）</div>
                <div className="mt-2 text-sm leading-relaxed text-muted">
                  该系列偏修身，介于两码之间建议选大一码。详情以实际试穿为准。
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-black/5">
                      <tr className="text-xs tracking-wide text-muted">
                        <th className="px-3 py-2">尺码</th>
                        <th className="px-3 py-2">胸围</th>
                        <th className="px-3 py-2">腰围</th>
                        <th className="px-3 py-2">裙长</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        ["XS", "80", "62", "118"],
                        ["S", "84", "66", "120"],
                        ["M", "88", "70", "122"],
                        ["L", "92", "74", "124"],
                      ].map((row) => (
                        <tr key={row[0]} className="text-fg/80">
                          {row.map((cell) => (
                            <td key={cell} className="px-3 py-2">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Button
                size="lg"
                onClick={() => {
                  addItem({ productId: product.id, size, quantity: qty });
                  setJustAdded(true);
                  window.setTimeout(() => setJustAdded(false), 1200);
                }}
              >
                加入购物车
              </Button>
              <Link to="/cart" className="block">
                <Button size="lg" variant="secondary" className="w-full">
                  去购物车
                </Button>
              </Link>
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 text-xs tracking-wide text-muted">
                数量
                <div className="inline-flex overflow-hidden rounded-full border border-border bg-bg/70">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="h-9 w-10 text-fg/70 hover:bg-fg/5 hover:text-fg"
                  >
                    −
                  </button>
                  <div className="flex h-9 w-12 items-center justify-center text-sm font-medium text-fg">
                    {qty}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(9, q + 1))}
                    className="h-9 w-10 text-fg/70 hover:bg-fg/5 hover:text-fg"
                  >
                    +
                  </button>
                </div>
              </div>
              {justAdded ? (
                <div className="text-xs font-medium tracking-wide text-navy">已加入购物车</div>
              ) : null}
            </div>
          </div>

          <div className="mt-8">
            <div className="text-xs tracking-[0.32em] text-muted">DETAILS</div>
            <div className="mt-3 text-sm leading-relaxed text-muted">
              极简剪裁与克制光泽，适合通勤与日常。以干净线条与留白呈现更高级的廓形比例。
            </div>
          </div>

          <div className="mt-10">
            <div className="text-xs tracking-[0.32em] text-muted">REVIEWS</div>
            <div className="mt-4 grid gap-3">
              {reviews.length ? (
                reviews.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-border bg-white/40 p-5 shadow-soft"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm font-medium tracking-wide text-fg">
                        {r.authorName}
                      </div>
                      <div className="flex items-center gap-3">
                        <Stars value={r.rating} />
                        <div className="text-xs tracking-wide text-muted">{r.createdAt}</div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm leading-relaxed text-muted">{r.content}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-border bg-bg/70 p-8 text-sm text-muted shadow-soft backdrop-blur">
                  暂无评价。
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
