import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import Empty from "@/components/Empty";
import { Button } from "@/components/Button";
import { useOrderStore } from "@/stores/orderStore";
import { formatCny } from "@/utils/money";

function formatTime(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export default function Orders() {
  const orders = useOrderStore((s) => s.orders);

  if (!orders.length) {
    return (
      <Empty
        title="暂无订单"
        description="完成一次 Mock 支付后，订单会出现在这里。"
        action={
          <Link to="/products">
            <Button>去逛商品</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Container className="py-10">
      <div className="text-xs tracking-[0.32em] text-muted">ORDERS</div>
      <div className="mt-2 font-display text-3xl tracking-wide text-fg">历史订单</div>

      <div className="mt-8 grid gap-4">
        {orders.map((o) => (
          <Link
            key={o.id}
            to={`/orders/${o.id}`}
            className="group block rounded-2xl border border-border bg-white/40 p-5 shadow-soft transition-shadow hover:shadow-float"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold tracking-wide text-fg">{o.orderNo}</div>
                <div className="mt-2 text-xs tracking-wide text-muted">{formatTime(o.createdAt)}</div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`rounded-full border px-3 py-1 text-xs tracking-[0.22em] ${
                    o.status === "PAID"
                      ? "border-navy/30 bg-navy/10 text-navy"
                      : "border-border bg-bg/70 text-fg/70"
                  }`}
                >
                  {o.status}
                </div>
                <div className="text-sm font-semibold tracking-wide text-fg">
                  {formatCny(o.totalAmount)}
                </div>
                <ArrowRight className="h-4 w-4 text-muted transition-colors group-hover:text-fg" />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {o.items.slice(0, 4).map((it) => (
                <div
                  key={`${it.productId}_${it.size}`}
                  className="rounded-full border border-border bg-bg/70 px-3 py-1 text-xs tracking-wide text-fg/75"
                >
                  {it.size} · ×{it.quantity}
                </div>
              ))}
              {o.items.length > 4 ? (
                <div className="rounded-full border border-border bg-bg/70 px-3 py-1 text-xs tracking-wide text-muted">
                  +{o.items.length - 4}
                </div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
