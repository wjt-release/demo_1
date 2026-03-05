export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | '均码'

export type Category = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories'

export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded'

export interface ProductColor {
  name: string
  hex: string
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  content: string
  size: Size
  createdAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  colors: ProductColor[]
  sizes: Size[]
  category: Category
  stock: number
  sales: number
  reviews: Review[]
  isNew?: boolean
  createdAt: string
}

export interface Address {
  id: string
  recipient: string
  phone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

export interface User {
  id: string
  email: string
  nickname: string
  avatar?: string
  addresses: Address[]
  createdAt: string
}

export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  size: Size
  color: string
  quantity: number
  price: number
}

export interface OrderItem {
  productId: string
  productName: string
  productImage: string
  size: Size
  color: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  address: Address
  status: OrderStatus
  paymentStatus: PaymentStatus
  totalAmount: number
  discountAmount: number
  finalAmount: number
  createdAt: string
  updatedAt: string
}

export interface FilterOptions {
  category?: Category
  sizes?: Size[]
  priceRange?: [number, number]
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'sales'
}

export interface Banner {
  id: string
  image: string
  title: string
  subtitle?: string
  link?: string
}
