import { create } from 'zustand';
import type { CartItem, Product } from '@/types';
import { storage } from '@/utils/storage';
import { generateId } from '@/utils/format';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, size: string, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  initCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  initCart: () => {
    const items = storage.get<CartItem[]>('cart') || [];
    set({ items });
  },

  addItem: (product: Product, size: string, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find(
      item => item.productId === product.id && item.size === size
    );

    if (existingItem) {
      const updatedItems = items.map(item =>
        item.id === existingItem.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      storage.set('cart', updatedItems);
      set({ items: updatedItems });
    } else {
      const newItem: CartItem = {
        id: generateId(),
        productId: product.id,
        product,
        size,
        quantity,
      };
      const updatedItems = [...items, newItem];
      storage.set('cart', updatedItems);
      set({ items: updatedItems });
    }
  },

  removeItem: (id: string) => {
    const updatedItems = get().items.filter(item => item.id !== id);
    storage.set('cart', updatedItems);
    set({ items: updatedItems });
  },

  updateQuantity: (id: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }
    const updatedItems = get().items.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    storage.set('cart', updatedItems);
    set({ items: updatedItems });
  },

  clearCart: () => {
    storage.set('cart', []);
    set({ items: [] });
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
