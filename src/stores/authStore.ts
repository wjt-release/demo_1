import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const user = storedUsers.find(
          (u: User) => u.email === email && u.password === password
        );

        if (user) {
          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      register: async (email: string, password: string, name: string) => {
        set({ isLoading: true });
        await new Promise((resolve) => setTimeout(resolve, 500));

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = storedUsers.find((u: User) => u.email === email);

        if (existingUser) {
          set({ isLoading: false });
          return false;
        }

        const newUser: User = {
          id: generateId(),
          email,
          password,
          name,
          addresses: [],
          createdAt: new Date().toISOString(),
        };

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));

        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (userData: Partial<User>) => {
        const { user } = get();
        if (!user) return;

        const updatedUser = { ...user, ...userData };
        set({ user: updatedUser });

        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = storedUsers.findIndex((u: User) => u.id === user.id);
        if (userIndex !== -1) {
          storedUsers[userIndex] = updatedUser;
          localStorage.setItem('users', JSON.stringify(storedUsers));
        }
      },

      addAddress: (address: Omit<Address, 'id'>) => {
        const { user, updateUser } = get();
        if (!user) return;

        const newAddress: Address = {
          ...address,
          id: generateId(),
        };

        if (newAddress.isDefault) {
          user.addresses.forEach((addr) => (addr.isDefault = false));
        }

        updateUser({
          addresses: [...user.addresses, newAddress],
        });
      },

      updateAddress: (id: string, addressData: Partial<Address>) => {
        const { user, updateUser } = get();
        if (!user) return;

        const addresses = user.addresses.map((addr) =>
          addr.id === id ? { ...addr, ...addressData } : addr
        );

        if (addressData.isDefault) {
          addresses.forEach((addr) => {
            if (addr.id !== id) addr.isDefault = false;
          });
        }

        updateUser({ addresses });
      },

      deleteAddress: (id: string) => {
        const { user, updateUser } = get();
        if (!user) return;

        updateUser({
          addresses: user.addresses.filter((addr) => addr.id !== id),
        });
      },

      setDefaultAddress: (id: string) => {
        const { user, updateUser } = get();
        if (!user) return;

        const addresses = user.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === id,
        }));

        updateUser({ addresses });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
