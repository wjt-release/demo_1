export type Product = {
  id: string;
  title: string;
  price: number;
  currency: "CNY";
  images: string[];
  sizes: Array<"XS" | "S" | "M" | "L" | "XL">;
  colorName: string;
  category: "Dresses" | "Tops" | "Outerwear" | "Bottoms";
  isNew?: boolean;
  isHot?: boolean;
};

export type Review = {
  id: string;
  productId: string;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  createdAt: string;
};

export type Address = {
  receiverName: string;
  phone: string;
  regionText: string;
  streetAddress: string;
};

export type CartItem = {
  productId: string;
  size: Product["sizes"][number];
  quantity: number;
};

export type OrderStatus = "UNPAID" | "PAID";

export type Order = {
  id: string;
  orderNo: string;
  status: OrderStatus;
  items: Array<{
    productId: string;
    titleSnapshot: string;
    imageSnapshot: string;
    size: Product["sizes"][number];
    unitPrice: number;
    quantity: number;
  }>;
  totalAmount: number;
  currency: "CNY";
  address: Address;
  createdAt: string;
  paidAt?: string;
};

export type User = {
  email: string;
};

