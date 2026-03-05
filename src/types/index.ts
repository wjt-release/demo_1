export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
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
  category: string;
  tags: string[];
  salesCount: number;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export interface Address {
  receiver: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  shippingAddress: Address;
  items: OrderItem[];
  createdAt: string;
  paidAt?: string;
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

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
