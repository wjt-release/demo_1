import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserInfo: (info: Partial<User>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: async (email: string, password: string) => {
        const storedUsers = localStorage.getItem('lumiere-users');
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          set({ user, isLoggedIn: true });
          return { success: true, message: '登录成功' };
        }
        
        return { success: false, message: '邮箱或密码错误' };
      },

      register: async (email: string, password: string, name: string) => {
        const storedUsers = localStorage.getItem('lumiere-users');
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
        localStorage.setItem('lumiere-users', JSON.stringify(users));
        
        set({ user: newUser, isLoggedIn: true });
        return { success: true, message: '注册成功' };
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      updateUserInfo: (info: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...info };
          set({ user: updatedUser });
          
          const storedUsers = localStorage.getItem('lumiere-users');
          const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
          const userIndex = users.findIndex(u => u.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            localStorage.setItem('lumiere-users', JSON.stringify(users));
          }
        }
      },
    }),
    {
      name: 'lumiere-user',
    }
  )
);
