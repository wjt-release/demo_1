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
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  sizes: string[];
  colors: string[];
  stock: number;
  images: string[];
  isNew?: boolean;
  isHot?: boolean;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  address: Address;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  product: Product;
  size: string;
  quantity: number;
  price: number;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  product: Product;
  size: string;
  quantity: number;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link?: string;
}

export interface LiveStream {
  id: string;
  title: string;
  coverImage: string;
  streamerName: string;
  streamerAvatar: string;
  viewerCount: number;
  isLive: boolean;
  startedAt: Date;
}

export interface LiveProduct {
  id: string;
  streamId: string;
  product: Product;
  discountPrice: number;
  discountEndTime: number;
  displayOrder: number;
}

export interface LiveComment {
  id: string;
  streamId: string;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface DeliveryMerchant {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  rating: number;
  reviewCount: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  minOrderAmount: number;
  deliveryFee: number;
  deliveryAreas: string[];
  tags: string[];
}

export interface DeliveryProduct {
  id: string;
  merchantId: string;
  product: Product;
  price: number;
  category: string;
  displayOrder: number;
}

export interface DeliveryReview {
  id: string;
  merchantId: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: Date;
}
