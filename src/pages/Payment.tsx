import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CreditCard, ShieldCheck } from "lucide-react";
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

export default function Payment() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderIdFromQuery = params.get("orderId") ?? undefined;
  const currentOrderId = useOrderStore((s) => s.currentOrderId);
  const setCurrentOrderId = useOrderStore((s) => s.setCurrentOrderId);
  const orders = useOrderStore((s) => s.orders);
  const markPaid = useOrderStore((s) => s.markPaid);

  const orderId = orderIdFromQuery ?? currentOrderId;
  const order = orderId ? orders.find((o) => o.id === orderId) : undefined;

  if (!order) {
    return (
      <Empty
        title="没有待支付订单"
        description="请先在购物车完成结算，或前往历史订单查看。"
        action={
          <div className="flex items-center gap-3">
            <Link to="/cart">
              <Button>去购物车</Button>
            </Link>
            <Link to="/orders">
              <Button variant="secondary">历史订单</Button>
            </Link>
          </div>
        }
      />
    );
  }

  return (
    <Container size="sm" className="py-10">
      <div className="rounded-2xl border border-border bg-bg/70 p-8 shadow-soft backdrop-blur">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-xs tracking-[0.32em] text-muted">PAYMENT</div>
            <div className="mt-2 font-display text-3xl tracking-wide text-fg">支付（Mock）</div>
            <div className="mt-2 text-sm text-muted">
              订单号 {order.orderNo} · {formatTime(order.createdAt)}
            </div>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/60">
            <CreditCard className="h-5 w-5 text-navy/80" />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-white/40 p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="tracking-wide text-muted">应付金额</span>
            <span className="text-base font-semibold tracking-wide text-fg">
              {formatCny(order.totalAmount)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="tracking-wide text-muted">状态</span>
            <span
              className={`rounded-full border px-3 py-1 text-xs tracking-[0.22em] ${
                order.status === "PAID"
                  ? "border-navy/30 bg-navy/10 text-navy"
                  : "border-border bg-bg/70 text-fg/70"
              }`}
            >
              {order.status === "PAID" ? "PAID" : "UNPAID"}
            </span>
          </div>
        </div>

        {order.status === "PAID" ? (
          <div className="mt-6 rounded-2xl border border-navy/20 bg-navy/5 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-navy/20 bg-white/60">
                <ShieldCheck className="h-5 w-5 text-navy/80" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-wide text-fg">付款完成</div>
                <div className="mt-1 text-xs tracking-wide text-muted">
                  {order.paidAt ? formatTime(order.paidAt) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {order.status === "PAID" ? (
            <Link to={`/orders/${order.id}`} className="block">
              <Button size="lg" className="w-full">
                查看订单详情
              </Button>
            </Link>
          ) : (
            <Button
              size="lg"
              onClick={() => {
                markPaid(order.id);
                setCurrentOrderId(order.id);
                navigate(`/orders/${order.id}`);
              }}
            >
              立即支付
            </Button>
          )}
          <Link to="/products" className="block">
            <Button size="lg" variant="secondary" className="w-full">
              继续选购
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
