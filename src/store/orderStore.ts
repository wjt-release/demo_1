import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderItem, OrderStatus } from '@/types';

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrders: () => Order[];
  getOrderById: (id: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order: Order) => {
        set({ orders: [order, ...get().orders] });
      },

      updateOrderStatus: (orderId: string, status: OrderStatus) => {
        const orders = get().orders;
        const index = orders.findIndex(o => o.id === orderId);
        if (index !== -1) {
          const newOrders = [...orders];
          newOrders[index] = { ...newOrders[index], status };
          set({ orders: newOrders });
        }
      },

      getOrders: () => get().orders,

      getOrderById: (id: string) => get().orders.find(o => o.id === id),
    }),
    {
      name: 'elegance-orders',
    }
  )
);

export const generateOrderId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `EL${timestamp}${random}`;
};
