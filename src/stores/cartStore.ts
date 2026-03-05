import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, size: string, color: string, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemById: (productId: string, size: string, color: string) => CartItem | undefined;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,

      addItem: (product: Product, size: string, color: string, quantity: number) => {
        const { items } = get();
        const existingItem = items.find(
          (item) =>
            item.productId === product.id &&
            item.size === size &&
            item.color === color
        );

        let newItems: CartItem[];

        if (existingItem) {
          newItems = items.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          const newItem: CartItem = {
            id: generateId(),
            productId: product.id,
            product,
            size,
            color,
            quantity,
          };
          newItems = [...items, newItem];
        }

        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      removeItem: (id: string) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== id);

        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      updateQuantity: (id: string, quantity: number) => {
        const { items } = get();
        
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const newItems = items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );

        const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = newItems.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );

        set({ items: newItems, totalItems, totalPrice });
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 });
      },

      getItemById: (productId: string, size: string, color: string) => {
        const { items } = get();
        return items.find(
          (item) =>
            item.productId === productId &&
            item.size === size &&
            item.color === color
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
