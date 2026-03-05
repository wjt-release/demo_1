import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Address } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUserInfo: (info: Partial<User>) => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  deleteAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        if (!email || !password) {
          return { success: false, error: '请输入邮箱和密码' }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          return { success: false, error: '请输入有效的邮箱地址' }
        }

        if (password.length < 6) {
          return { success: false, error: '密码长度至少6位' }
        }

        const user: User = {
          id: generateId(),
          email,
          nickname: email.split('@')[0],
          addresses: [],
          createdAt: new Date().toISOString(),
        }

        set({ user, isAuthenticated: true })
        return { success: true }
      },

      register: async (email: string, password: string) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        
        if (!email || !password) {
          return { success: false, error: '请输入邮箱和密码' }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          return { success: false, error: '请输入有效的邮箱地址' }
        }

        if (password.length < 6) {
          return { success: false, error: '密码长度至少6位' }
        }

        const user: User = {
          id: generateId(),
          email,
          nickname: email.split('@')[0],
          addresses: [],
          createdAt: new Date().toISOString(),
        }

        set({ user, isAuthenticated: true })
        return { success: true }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      updateUserInfo: (info) => {
        const { user } = get()
        if (user) {
          set({ user: { ...user, ...info } })
        }
      },

      addAddress: (address) => {
        const { user } = get()
        if (user) {
          const newAddress: Address = {
            ...address,
            id: generateId(),
          }
          if (address.isDefault) {
            user.addresses.forEach((addr) => {
              addr.isDefault = false
            })
          }
          if (user.addresses.length === 0) {
            newAddress.isDefault = true
          }
          set({
            user: {
              ...user,
              addresses: [...user.addresses, newAddress],
            },
          })
        }
      },

      updateAddress: (id, addressUpdate) => {
        const { user } = get()
        if (user) {
          const addresses = user.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...addressUpdate } : addr
          )
          if (addressUpdate.isDefault) {
            addresses.forEach((addr) => {
              if (addr.id !== id) {
                addr.isDefault = false
              }
            })
          }
          set({ user: { ...user, addresses } })
        }
      },

      deleteAddress: (id) => {
        const { user } = get()
        if (user) {
          const addresses = user.addresses.filter((addr) => addr.id !== id)
          if (addresses.length > 0 && !addresses.some((addr) => addr.isDefault)) {
            addresses[0].isDefault = true
          }
          set({ user: { ...user, addresses } })
        }
      },

      setDefaultAddress: (id) => {
        const { user } = get()
        if (user) {
          const addresses = user.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          }))
          set({ user: { ...user, addresses } })
        }
      },
    }),
    {
      name: 'luxe-auth',
    }
  )
)
