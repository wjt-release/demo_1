import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const storedUsers = localStorage.getItem('elegance-users');
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          set({ user, isAuthenticated: true });
          return { success: true, message: '登录成功' };
        }
        
        return { success: false, message: '邮箱或密码错误' };
      },

      register: async (email: string, password: string, name: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const storedUsers = localStorage.getItem('elegance-users');
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
        
        if (users.find(u => u.email === email)) {
          return { success: false, message: '该邮箱已被注册' };
        }
        
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          password,
          name,
          createdAt: new Date(),
        };
        
        users.push(newUser);
        localStorage.setItem('elegance-users', JSON.stringify(users));
        
        set({ user: newUser, isAuthenticated: true });
        return { success: true, message: '注册成功' };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...data };
          set({ user: updatedUser });
          
          const storedUsers = localStorage.getItem('elegance-users');
          const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
          const index = users.findIndex(u => u.id === currentUser.id);
          if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem('elegance-users', JSON.stringify(users));
          }
        }
      },
    }),
    {
      name: 'elegance-auth',
    }
  )
);
