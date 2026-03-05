import { Link, useParams } from "react-router-dom";
import { ChevronLeft, MapPin, Mail } from "lucide-react";
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

export default function OrderDetail() {
  const { id } = useParams();
  const orders = useOrderStore((s) => s.orders);
  const order = id ? orders.find((o) => o.id === id) : undefined;

  if (!order) {
    return (
      <Empty
        title="订单不存在"
        description="你访问的订单可能不存在或已被清理。"
        action={
          <Link to="/orders">
            <Button variant="secondary">返回订单列表</Button>
          </Link>
        }
      />
    );
  }

  return (
    <Container className="py-10">
      <Link
        to="/orders"
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm tracking-wide text-fg/75 transition-colors hover:bg-fg/5 hover:text-fg"
      >
        <ChevronLeft className="h-4 w-4" />
        返回订单列表
      </Link>

      <div className="mt-6 rounded-2xl border border-border bg-bg/70 p-8 shadow-soft backdrop-blur">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs tracking-[0.32em] text-muted">ORDER</div>
            <div className="mt-2 font-display text-3xl tracking-wide text-fg">{order.orderNo}</div>
            <div className="mt-2 text-sm text-muted">{formatTime(order.createdAt)}</div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className={`rounded-full border px-3 py-1 text-xs tracking-[0.22em] ${
                order.status === "PAID"
                  ? "border-navy/30 bg-navy/10 text-navy"
                  : "border-border bg-bg/70 text-fg/70"
              }`}
            >
              {order.status}
            </div>
            <div className="text-base font-semibold tracking-wide text-fg">
              {formatCny(order.totalAmount)}
            </div>
          </div>
        </div>

        {order.paidAt ? (
          <div className="mt-4 text-xs tracking-wide text-muted">支付时间：{formatTime(order.paidAt)}</div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            <div className="text-xs tracking-[0.32em] text-muted">ITEMS</div>
            <div className="grid gap-3">
              {order.items.map((it) => (
                <div
                  key={`${it.productId}_${it.size}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white/40 p-4 shadow-soft"
                >
                  <div className="h-20 w-20 overflow-hidden rounded-xl border border-border bg-white/50">
                    <img src={it.imageSnapshot} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium tracking-wide text-fg">
                      {it.titleSnapshot}
                    </div>
                    <div className="mt-2 text-xs tracking-wide text-muted">
                      {it.size} · ×{it.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-semibold tracking-wide text-fg">
                    {formatCny(it.unitPrice * it.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit rounded-2xl border border-border bg-white/40 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs tracking-[0.32em] text-muted">ADDRESS</div>
              <MapPin className="h-4 w-4 text-muted" />
            </div>
            <div className="mt-4 text-sm font-medium tracking-wide text-fg">
              {order.address.receiverName} · {order.address.phone}
            </div>
            <div className="mt-2 text-sm leading-relaxed text-muted">
              {order.address.regionText}
              <br />
              {order.address.streetAddress}
            </div>
            {order.status !== "PAID" ? (
              <div className="mt-6">
                <Link to={`/payment?orderId=${encodeURIComponent(order.id)}`}>
                  <Button size="lg" className="w-full">
                    去支付
                  </Button>
                </Link>
              </div>
            ) : null}
            <div className="mt-3">
              <Button
                size="lg"
                variant="secondary"
                className="w-full"
                onClick={() => {
                  const subject = encodeURIComponent(`订单咨询｜${order.orderNo}`);
                  const body = encodeURIComponent(
                    `订单号：${order.orderNo}\n状态：${order.status}\n\n请在此描述你的问题：\n`,
                  );
                  window.location.href = `mailto:support@noir-demo.cn?subject=${subject}&body=${body}`;
                }}
              >
                <Mail className="h-4 w-4" />
                邮件联系客服
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
