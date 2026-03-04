import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity: number, size: string, color: string) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          item => item.product.id === product.id && item.size === size && item.color === color
        );

        if (existingIndex !== -1) {
          const newItems = [...items];
          newItems[existingIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({
            items: [...items, { product, quantity, size, color }],
          });
        }
      },

      removeItem: (productId: string, size: string) => {
        set({
          items: get().items.filter(
            item => !(item.product.id === productId && item.size === size)
          ),
        });
      },

      updateQuantity: (productId: string, size: string, quantity: number) => {
        const items = get().items;
        const newItems = items.map(item => {
          if (item.product.id === productId && item.size === size) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        });
        set({ items: newItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'lumiere-cart',
    }
  )
);
