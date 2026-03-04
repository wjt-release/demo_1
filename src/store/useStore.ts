import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, User, Order } from '../types';

interface StoreState {
  cart: CartItem[];
  user: User | null;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  login: (email: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      user: null,
      addToCart: (product, size) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id && item.size === size
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1, size }] };
        }),
      removeFromCart: (productId, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        })),
      updateQuantity: (productId, size, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      login: (email) =>
        set({
          user: {
            id: 'u1',
            email,
            name: email.split('@')[0],
            orders: [],
          },
        }),
      logout: () => set({ user: null }),
      addOrder: (order) =>
        set((state) => {
          if (!state.user) return {};
          return {
            user: {
              ...state.user,
              orders: [order, ...state.user.orders],
            },
          };
        }),
    }),
    {
      name: 'lumina-storage',
    }
  )
);
