import type { Product } from "@/types/commerce";

const i = (id: string, params: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80&${params}`;

export const products: Product[] = [
  {
    id: "p_dress_001",
    title: "结构感收腰连衣裙",
    price: 399,
    currency: "CNY",
    images: [
      i("photo-1520975958221-0d6d2a0b6b86", "crop=entropy"),
      i("photo-1520975958221-0d6d2a0b6b86", "crop=faces"),
      i("photo-1520975958221-0d6d2a0b6b86", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colorName: "Black",
    category: "Dresses",
    isNew: true,
    isHot: true,
  },
  {
    id: "p_top_001",
    title: "米色极简针织上衣",
    price: 259,
    currency: "CNY",
    images: [
      i("photo-1520975592231-6cc99f24c1b4", "crop=entropy"),
      i("photo-1520975592231-6cc99f24c1b4", "crop=faces"),
      i("photo-1520975592231-6cc99f24c1b4", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colorName: "Beige",
    category: "Tops",
    isNew: true,
  },
  {
    id: "p_outer_001",
    title: "深蓝短款廓形外套",
    price: 699,
    currency: "CNY",
    images: [
      i("photo-1520975869011-7f4f8a5e8f21", "crop=entropy"),
      i("photo-1520975869011-7f4f8a5e8f21", "crop=faces"),
      i("photo-1520975869011-7f4f8a5e8f21", "crop=edges"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colorName: "Navy",
    category: "Outerwear",
    isHot: true,
  },
  {
    id: "p_bottom_001",
    title: "高腰直筒西装裤",
    price: 329,
    currency: "CNY",
    images: [
      i("photo-1520975919016-1ea6f9d7a0f4", "crop=entropy"),
      i("photo-1520975919016-1ea6f9d7a0f4", "crop=faces"),
      i("photo-1520975919016-1ea6f9d7a0f4", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colorName: "Charcoal",
    category: "Bottoms",
  },
  {
    id: "p_dress_002",
    title: "丝缎质感吊带长裙",
    price: 459,
    currency: "CNY",
    images: [
      i("photo-1520975958218-1d0c5b9b0f2b", "crop=entropy"),
      i("photo-1520975958218-1d0c5b9b0f2b", "crop=faces"),
      i("photo-1520975958218-1d0c5b9b0f2b", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colorName: "Ecru",
    category: "Dresses",
    isNew: true,
  },
  {
    id: "p_top_002",
    title: "黑色极简衬衫（微光泽）",
    price: 299,
    currency: "CNY",
    images: [
      i("photo-1520975656254-2aa25a5c13b2", "crop=entropy"),
      i("photo-1520975656254-2aa25a5c13b2", "crop=faces"),
      i("photo-1520975656254-2aa25a5c13b2", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colorName: "Black",
    category: "Tops",
    isHot: true,
  },
  {
    id: "p_bottom_002",
    title: "深蓝百褶半身裙",
    price: 289,
    currency: "CNY",
    images: [
      i("photo-1520975816458-7a2f03f06abb", "crop=entropy"),
      i("photo-1520975816458-7a2f03f06abb", "crop=faces"),
      i("photo-1520975816458-7a2f03f06abb", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colorName: "Navy",
    category: "Bottoms",
    isNew: true,
  },
  {
    id: "p_outer_002",
    title: "米色长款风衣",
    price: 899,
    currency: "CNY",
    images: [
      i("photo-1520975984332-3d3b86e8f04a", "crop=entropy"),
      i("photo-1520975984332-3d3b86e8f04a", "crop=faces"),
      i("photo-1520975984332-3d3b86e8f04a", "crop=edges"),
    ],
    sizes: ["S", "M", "L", "XL"],
    colorName: "Beige",
    category: "Outerwear",
  },
  {
    id: "p_top_003",
    title: "灰调短款针织开衫",
    price: 269,
    currency: "CNY",
    images: [
      i("photo-1520975737230-3a8c0b5b7a7f", "crop=entropy"),
      i("photo-1520975737230-3a8c0b5b7a7f", "crop=faces"),
      i("photo-1520975737230-3a8c0b5b7a7f", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colorName: "Stone",
    category: "Tops",
  },
  {
    id: "p_bottom_003",
    title: "直筒牛仔裤（浅灰洗）",
    price: 349,
    currency: "CNY",
    images: [
      i("photo-1520975931524-3f9f5c0f0f4f", "crop=entropy"),
      i("photo-1520975931524-3f9f5c0f0f4f", "crop=faces"),
      i("photo-1520975931524-3f9f5c0f0f4f", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colorName: "Gray",
    category: "Bottoms",
    isHot: true,
  },
  {
    id: "p_dress_003",
    title: "深蓝极简针织连衣裙",
    price: 429,
    currency: "CNY",
    images: [
      i("photo-1520975797867-0e23a6c0a8c5", "crop=entropy"),
      i("photo-1520975797867-0e23a6c0a8c5", "crop=faces"),
      i("photo-1520975797867-0e23a6c0a8c5", "crop=edges"),
    ],
    sizes: ["XS", "S", "M", "L"],
    colorName: "Navy",
    category: "Dresses",
  },
];

export const categories: Array<Product["category"]> = ["Dresses", "Tops", "Outerwear", "Bottoms"];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

