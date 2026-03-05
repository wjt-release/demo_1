import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Order, OrderItem, OrderStatus, PaymentStatus, Address, CartItem } from '../types'

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  createOrder: (userId: string, items: CartItem[], address: Address) => Order
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => void
  getOrdersByUser: (userId: string) => Order[]
  getOrderById: (orderId: string) => Order | undefined
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      createOrder: (userId, items, address) => {
        const orderItems: OrderItem[] = items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
        }))

        const totalAmount = items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )

        const order: Order = {
          id: generateId(),
          userId,
          items: orderItems,
          address,
          status: 'pending',
          paymentStatus: 'unpaid',
          totalAmount,
          discountAmount: 0,
          finalAmount: totalAmount,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        }))

        return order
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          ),
          currentOrder:
            state.currentOrder?.id === orderId
              ? { ...state.currentOrder, status, updatedAt: new Date().toISOString() }
              : state.currentOrder,
        }))
      },

      updatePaymentStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId
              ? {
                  ...order,
                  paymentStatus: status,
                  status: status === 'paid' ? 'paid' : order.status,
                  updatedAt: new Date().toISOString(),
                }
              : order
          ),
          currentOrder:
            state.currentOrder?.id === orderId
              ? {
                  ...state.currentOrder,
                  paymentStatus: status,
                  status: status === 'paid' ? 'paid' : state.currentOrder.status,
                  updatedAt: new Date().toISOString(),
                }
              : state.currentOrder,
        }))
      },

      getOrdersByUser: (userId) => {
        return get().orders.filter((order) => order.userId === userId)
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId)
      },
    }),
    {
      name: 'luxe-orders',
    }
  )
)
