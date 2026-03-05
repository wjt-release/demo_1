export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  category: string;
  isNew: boolean;
  isHot: boolean;
  stock: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
}

export interface Address {
  id: string;
  receiver: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
