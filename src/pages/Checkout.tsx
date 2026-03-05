import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/Container";
import Empty from "@/components/Empty";
import { Button } from "@/components/Button";
import { TextField } from "@/components/TextField";
import { products } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { formatCny } from "@/utils/money";
import { readJson, writeJson } from "@/utils/storage";
import type { Address } from "@/types/commerce";

const ADDRESS_KEY = "noir_address_v1";

function validatePhone(phone: string) {
  return /^1\d{10}$/.test(phone.trim());
}

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clear);
  const createOrder = useOrderStore((s) => s.createFromCart);

  const initialAddress = readJson<Address>(
    ADDRESS_KEY,
    {
      receiverName: "",
      phone: "",
      regionText: "",
      streetAddress: "",
    },
  );

  const [address, setAddress] = useState<Address>(initialAddress);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});

  const lines = useMemo(() => {
    return items
      .map((it) => {
        const p = products.find((x) => x.id === it.productId);
        if (!p) return null;
        return { product: p, size: it.size, quantity: it.quantity, lineTotal: p.price * it.quantity };
      })
      .filter(Boolean) as Array<{
      product: (typeof products)[number];
      size: (typeof items)[number]["size"];
      quantity: number;
      lineTotal: number;
    }>;
  }, [items]);

  const total = lines.reduce((sum, l) => sum + l.lineTotal, 0);

  if (!lines.length) {
    return (
      <Empty
        title="还不能结算"
        description="你的购物车是空的，先去选购喜欢的单品。"
        action={
          <Link to="/products">
            <Button>去逛商品</Button>
          </Link>
        }
      />
    );
  }

  const onSubmit = () => {
    const nextErrors: typeof errors = {};
    if (!address.receiverName.trim()) nextErrors.receiverName = "请填写收货人";
    if (!validatePhone(address.phone)) nextErrors.phone = "请输入正确的手机号";
    if (!address.regionText.trim()) nextErrors.regionText = "请填写所在地区";
    if (!address.streetAddress.trim()) nextErrors.streetAddress = "请填写详细地址";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    writeJson(ADDRESS_KEY, address);
    const orderId = createOrder({ address, items });
    clearCart();
    navigate(`/payment?orderId=${encodeURIComponent(orderId)}`);
  };

  return (
    <Container className="py-10">
      <div className="text-xs tracking-[0.32em] text-muted">CHECKOUT</div>
      <div className="mt-2 font-display text-3xl tracking-wide text-fg">下单结算</div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-border bg-bg/70 p-6 shadow-soft backdrop-blur">
          <div className="text-xs tracking-[0.32em] text-muted">ADDRESS</div>
          <div className="mt-5 grid gap-4">
            <TextField
              label="收货人"
              value={address.receiverName}
              onChange={(e) => setAddress((a) => ({ ...a, receiverName: e.target.value }))}
              error={errors.receiverName}
              placeholder="张三"
              autoComplete="name"
            />
            <TextField
              label="手机号"
              value={address.phone}
              onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))}
              error={errors.phone}
              placeholder="1xxxxxxxxxx"
              inputMode="numeric"
              autoComplete="tel"
            />
            <TextField
              label="所在地区"
              value={address.regionText}
              onChange={(e) => setAddress((a) => ({ ...a, regionText: e.target.value }))}
              error={errors.regionText}
              placeholder="上海市 浦东新区"
              autoComplete="address-level2"
            />
            <TextField
              label="详细地址"
              value={address.streetAddress}
              onChange={(e) => setAddress((a) => ({ ...a, streetAddress: e.target.value }))}
              error={errors.streetAddress}
              placeholder="xx路xx号 xx室"
              autoComplete="street-address"
            />
          </div>
        </div>

        <div className="h-fit rounded-2xl border border-border bg-bg/70 p-6 shadow-soft backdrop-blur">
          <div className="text-xs tracking-[0.32em] text-muted">ORDER</div>
          <div className="mt-5 grid gap-3">
            {lines.map((l) => (
              <div
                key={`${l.product.id}_${l.size}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-border bg-white/40 px-4 py-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium tracking-wide text-fg">
                    {l.product.title}
                  </div>
                  <div className="mt-1 text-xs tracking-wide text-muted">
                    {l.size} · ×{l.quantity}
                  </div>
                </div>
                <div className="shrink-0 text-sm font-semibold tracking-wide text-fg">
                  {formatCny(l.lineTotal)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 h-px bg-border" />
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="tracking-wide text-muted">应付</span>
            <span className="text-base font-semibold tracking-wide text-fg">{formatCny(total)}</span>
          </div>

          <div className="mt-6 grid gap-3">
            <Button size="lg" onClick={onSubmit}>
              提交订单并去支付
            </Button>
            <Link to="/cart">
              <Button size="lg" variant="secondary" className="w-full">
                返回购物车
              </Button>
            </Link>
          </div>

          <div className="mt-4 text-xs leading-relaxed text-muted">
            支付为 Mock：点击支付即付款完成，并可在历史订单中查看。
          </div>
        </div>
      </div>
    </Container>
  );
}
