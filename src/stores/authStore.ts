import { create } from 'zustand';
import type { User } from '@/types';
import { storage } from '@/utils/storage';
import { generateId } from '@/utils/format';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  initAuth: () => {
    const user = storage.get<User>('user');
    if (user) {
      set({ user, isAuthenticated: true });
    }
  },

  login: async (email: string, password: string) => {
    const users = storage.get<User[]>('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      storage.set('user', user);
      set({ user, isAuthenticated: true });
      return { success: true };
    }
    
    return { success: false, error: '邮箱或密码错误' };
  },

  register: async (email: string, password: string, name: string) => {
    const users = storage.get<User[]>('users') || [];
    
    if (users.some(u => u.email === email)) {
      return { success: false, error: '该邮箱已被注册' };
    }

    const newUser: User = {
      id: generateId(),
      email,
      password,
      name,
      createdAt: new Date().toISOString(),
    };

    storage.set('users', [...users, newUser]);
    storage.set('user', newUser);
    set({ user: newUser, isAuthenticated: true });
    
    return { success: true };
  },

  logout: () => {
    storage.remove('user');
    set({ user: null, isAuthenticated: false });
  },
}));
