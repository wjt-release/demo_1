import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { users } from '../mock/data';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, size, color) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.id === product.id && item.size === size && item.color === color
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.size === size && item.color === color
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, size, color, quantity: 1, cartId: `${product.id}-${size}-${color}` }] });
        }
      },
      removeFromCart: (cartId) => {
        set({ items: get().items.filter((item) => item.cartId !== cartId) });
      },
      updateQuantity: (cartId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(cartId);
        } else {
          set({
            items: get().items.map((item) =>
              item.cartId === cartId ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      orders: [], // Global orders for demo simplicity, or filter by user
      isAuthenticated: false,
      login: (email, password) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      register: (email, password) => {
        // Mock registration
        const newUser = { id: `u${Date.now()}`, email, password, name: 'New User' };
        set({ user: newUser, isAuthenticated: true });
        return true;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      addOrder: (order) => {
        set((state) => ({ 
          orders: [order, ...state.orders] 
        }));
      },
    }),
    {
      name: 'user-storage',
    }
  )
);

export const useUIStore = create((set) => ({
  isCartOpen: false,
  isMenuOpen: false,
  isNewUserModalOpen: true, // Open by default for demo
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeNewUserModal: () => set({ isNewUserModalOpen: false }),
}));
