import { create } from 'zustand';
import type { Order, OrderItem, Address } from '@/types';
import { storage } from '@/utils/storage';
import { generateId } from '@/utils/format';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (items: OrderItem[], address: Address) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  initOrders: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  currentOrder: null,

  initOrders: () => {
    const orders = storage.get<Order[]>('orders') || [];
    set({ orders });
  },

  createOrder: (items: OrderItem[], address: Address) => {
    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const newOrder: Order = {
      id: generateId(),
      userId: storage.get<{ id: string }>('user')?.id || '',
      status: 'pending',
      totalAmount,
      shippingAddress: address,
      items,
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [newOrder, ...get().orders];
    storage.set('orders', updatedOrders);
    set({ orders: updatedOrders, currentOrder: newOrder });
    
    return newOrder;
  },

  updateOrderStatus: (orderId: string, status: Order['status']) => {
    const updatedOrders = get().orders.map(order =>
      order.id === orderId
        ? {
            ...order,
            status,
            ...(status === 'paid' ? { paidAt: new Date().toISOString() } : {}),
          }
        : order
    );
    storage.set('orders', updatedOrders);
    
    const currentOrder = get().currentOrder;
    set({
      orders: updatedOrders,
      currentOrder:
        currentOrder?.id === orderId
          ? { ...currentOrder, status, ...(status === 'paid' ? { paidAt: new Date().toISOString() } : {}) }
          : currentOrder,
    });
  },

  getOrdersByUser: (userId: string) => {
    return get().orders.filter(order => order.userId === userId);
  },

  getOrderById: (orderId: string) => {
    return get().orders.find(order => order.id === orderId);
  },
}));
