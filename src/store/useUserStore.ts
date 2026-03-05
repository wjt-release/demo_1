import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Order } from '../types';

interface UserState {
  user: User | null;
  orders: Order[];
  login: (user: User) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  register: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      orders: [],
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
      register: (user) => set({ user }),
    }),
    {
      name: 'user-storage',
    }
  )
);
