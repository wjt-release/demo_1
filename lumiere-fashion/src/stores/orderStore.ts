import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, CartItem, Address } from '../types';

interface OrderState {
  orders: Order[];
  createOrder: (userId: string, items: CartItem[], totalAmount: number, address: Address) => Order;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (id: string) => Order | undefined;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (userId: string, items: CartItem[], totalAmount: number, address: Address) => {
        const newOrder: Order = {
          id: `order-${Date.now()}`,
          userId,
          items,
          totalAmount,
          status: 'pending',
          shippingAddress: address,
          createdAt: new Date().toISOString(),
        };

        set(state => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      getOrdersByUser: (userId: string) => {
        return get().orders.filter(order => order.userId === userId);
      },

      getOrderById: (id: string) => {
        return get().orders.find(order => order.id === id);
      },

      updateOrderStatus: (id: string, status: Order['status']) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === id
              ? {
                  ...order,
                  status,
                  paidAt: status === 'paid' ? new Date().toISOString() : order.paidAt,
                }
              : order
          ),
        }));
      },
    }),
    {
      name: 'lumiere-orders',
    }
  )
);
