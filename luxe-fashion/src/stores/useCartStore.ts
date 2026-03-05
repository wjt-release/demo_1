import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, Size } from '../types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product, size: Size, color: string, quantity: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, color, quantity) => {
        const { items } = get()
        const existingItem = items.find(
          (item) =>
            item.productId === product.id && item.size === size && item.color === color
        )

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          })
        } else {
          const newItem: CartItem = {
            id: generateId(),
            productId: product.id,
            productName: product.name,
            productImage: product.images[0],
            size,
            color,
            quantity,
            price: product.price,
          }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (itemId) => {
        set({ items: get().items.filter((item) => item.id !== itemId) })
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        set({
          items: get().items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'luxe-cart',
    }
  )
)
