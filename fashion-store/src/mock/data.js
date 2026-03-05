export const products = [
  {
    id: 1,
    name: "Classic Wool Blend Coat",
    price: 1299,
    currency: "CNY",
    category: "Outerwear",
    image: "https://placehold.co/400x600/e5e5e5/000000?text=Wool+Coat",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Camel"],
    description: "A timeless wool blend coat with a structured silhouette. Perfect for the modern wardrobe.",
    isNew: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Silk Satin Midi Dress",
    price: 799,
    currency: "CNY",
    category: "Dresses",
    image: "https://placehold.co/400x600/e5e5e5/000000?text=Silk+Dress",
    sizes: ["S", "M", "L"],
    colors: ["Black", "Champagne"],
    description: "Elegant silk satin midi dress with a cowl neckline and adjustable straps.",
    isNew: true,
    rating: 4.5,
    reviews: 89
  },
  {
    id: 3,
    name: "Oversized Cotton Shirt",
    price: 399,
    currency: "CNY",
    category: "Tops",
    image: "https://placehold.co/400x600/e5e5e5/000000?text=Cotton+Shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Blue Striped"],
    description: "Crisp cotton shirt with an oversized fit. A versatile staple.",
    isNew: false,
    rating: 4.7,
    reviews: 210
  },
  {
    id: 4,
    name: "Wide-Leg Tailored Trousers",
    price: 599,
    currency: "CNY",
    category: "Bottoms",
    image: "https://placehold.co/400x600/e5e5e5/000000?text=Trousers",
    sizes: ["34", "36", "38", "40"],
    colors: ["Black", "Grey"],
    description: "High-waisted wide-leg trousers made from premium suiting fabric.",
    isNew: false,
    rating: 4.6,
    reviews: 156
  },
  {
    id: 5,
    name: "Cashmere Crewneck Sweater",
    price: 1499,
    currency: "CNY",
    category: "Knitwear",
    image: "https://placehold.co/400x600/e5e5e5/000000?text=Cashmere",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Navy"],
    description: "Luxuriously soft cashmere sweater in a classic crewneck style.",
    isNew: true,
    rating: 4.9,
    reviews: 45
  },
  {
    id: 6,
    name: "Leather Ankle Boots",
    price: 899,
    currency: "CNY",
    category: "Shoes",
    image: "https://placehold.co/400x600/e5e5e5/000000?text=Boots",
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Black"],
    description: "Genuine leather ankle boots with a block heel.",
    isNew: false,
    rating: 4.7,
    reviews: 78
  }
];

export const users = [
  {
    id: "u1",
    email: "user@example.com",
    password: "password", // In a real app, this would be hashed
    name: "Fashion Lover",
    addresses: [],
    orders: []
  }
];
