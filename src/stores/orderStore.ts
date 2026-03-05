import { create } from "zustand";
import type { Address, CartItem, Order } from "@/types/commerce";
import { products } from "@/data/products";
import { createId, createOrderNo } from "@/utils/id";
import { readJson, writeJson } from "@/utils/storage";

type OrderState = {
  orders: Order[];
  currentOrderId?: string;
  createFromCart: (input: { address: Address; items: CartItem[] }) => string;
  markPaid: (orderId: string) => void;
  setCurrentOrderId: (orderId?: string) => void;
};

const STORAGE_KEY = "noir_orders_v1";
const STORAGE_CURRENT = "noir_current_order_v1";

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: readJson<Order[]>(STORAGE_KEY, []),
  currentOrderId: readJson<string | undefined>(STORAGE_CURRENT, undefined),

  createFromCart: ({ address, items }) => {
    const now = new Date().toISOString();
    const orderId = createId("o");
    const orderNo = createOrderNo();

    const lineItems = items
      .map((it) => {
        const p = products.find((x) => x.id === it.productId);
        if (!p) return null;
        return {
          productId: p.id,
          titleSnapshot: p.title,
          imageSnapshot: p.images[0],
          size: it.size,
          unitPrice: p.price,
          quantity: it.quantity,
        };
      })
      .filter(Boolean) as Order["items"];

    const total = lineItems.reduce((sum, it) => sum + it.unitPrice * it.quantity, 0);

    const order: Order = {
      id: orderId,
      orderNo,
      status: "UNPAID" as const,
      items: lineItems,
      totalAmount: total,
      currency: "CNY",
      address,
      createdAt: now,
    };

    const next = [order, ...get().orders];
    writeJson(STORAGE_KEY, next);
    writeJson(STORAGE_CURRENT, orderId);
    set({ orders: next, currentOrderId: orderId });
    return orderId;
  },

  markPaid: (orderId) => {
    const now = new Date().toISOString();
    const next = get().orders.map((o) =>
      o.id === orderId ? { ...o, status: "PAID" as const, paidAt: now } : o,
    );
    writeJson(STORAGE_KEY, next);
    set({ orders: next });
  },

  setCurrentOrderId: (orderId) => {
    writeJson(STORAGE_CURRENT, orderId);
    set({ currentOrderId: orderId });
  },
}));
