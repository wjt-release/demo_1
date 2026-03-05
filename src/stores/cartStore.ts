import { create } from "zustand";
import type { CartItem, Product } from "@/types/commerce";
import { readJson, writeJson } from "@/utils/storage";

type CartState = {
  items: CartItem[];
  addItem: (input: { productId: string; size: Product["sizes"][number]; quantity?: number }) => void;
  setQuantity: (key: { productId: string; size: Product["sizes"][number] }, quantity: number) => void;
  removeItem: (key: { productId: string; size: Product["sizes"][number] }) => void;
  clear: () => void;
};

const STORAGE_KEY = "noir_cart_v1";

export const useCartStore = create<CartState>((set, get) => ({
  items: readJson<CartItem[]>(STORAGE_KEY, []),

  addItem: ({ productId, size, quantity = 1 }) => {
    const items = get().items.slice();
    const idx = items.findIndex((it) => it.productId === productId && it.size === size);
    if (idx >= 0) {
      items[idx] = { ...items[idx], quantity: items[idx].quantity + quantity };
    } else {
      items.push({ productId, size, quantity });
    }
    writeJson(STORAGE_KEY, items);
    set({ items });
  },

  setQuantity: ({ productId, size }, quantity) => {
    const next = Math.max(1, Math.floor(quantity || 1));
    const items = get()
      .items.map((it) => (it.productId === productId && it.size === size ? { ...it, quantity: next } : it));
    writeJson(STORAGE_KEY, items);
    set({ items });
  },

  removeItem: ({ productId, size }) => {
    const items = get().items.filter((it) => !(it.productId === productId && it.size === size));
    writeJson(STORAGE_KEY, items);
    set({ items });
  },

  clear: () => {
    writeJson(STORAGE_KEY, []);
    set({ items: [] });
  },
}));

