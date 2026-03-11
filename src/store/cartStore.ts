import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isItemInCart: (productId: string, size: string) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, size: string, quantity: number = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          item => item.productId === product.id && item.size === size
        );

        if (existingIndex !== -1) {
          const newItems = [...items];
          newItems[existingIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({
            items: [...items, { productId: product.id, product, size, quantity }],
          });
        }
      },

      removeItem: (productId: string, size: string) => {
        set({
          items: get().items.filter(
            item => !(item.productId === productId && item.size === size)
          ),
        });
      },

      updateQuantity: (productId: string, size: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }

        const items = get().items;
        const index = items.findIndex(
          item => item.productId === productId && item.size === size
        );

        if (index !== -1) {
          const newItems = [...items];
          newItems[index].quantity = quantity;
          set({ items: newItems });
        }
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

      isItemInCart: (productId: string, size: string) => {
        return get().items.some(
          item => item.productId === productId && item.size === size
        );
      },
    }),
    {
      name: 'elegance-cart',
    }
  )
);
