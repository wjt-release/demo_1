export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  stock: number;
  sales: number;
  isNew: boolean;
  isHot: boolean;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  date: string;
  size: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Address {
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  shippingAddress: Address;
  createdAt: string;
  paidAt?: string;
}

export interface Banner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  link: string;
}
