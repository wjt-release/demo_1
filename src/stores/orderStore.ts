import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, OrderItem, Address } from '@/types';

interface OrderState {
  orders: Order[];
  createOrder: (userId: string, items: OrderItem[], shippingAddress: Address, totalAmount: number) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByUserId: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (userId: string, items: OrderItem[], shippingAddress: Address, totalAmount: number) => {
        const newOrder: Order = {
          id: generateId(),
          userId,
          items,
          shippingAddress,
          totalAmount,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },

      getOrdersByUserId: (userId: string) => {
        const { orders } = get();
        return orders.filter((order) => order.userId === userId);
      },

      getOrderById: (orderId: string) => {
        const { orders } = get();
        return orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: 'order-storage',
    }
  )
);
