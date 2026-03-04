import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Minimalist Wool Coat',
    price: 1299,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A timeless wool coat featuring a structured silhouette and premium fabric blend. Perfect for layering in colder months.',
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviews: 124,
    newArrival: true,
    bestSeller: true
  },
  {
    id: '2',
    name: 'Silk Blend Blouse',
    price: 499,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Elegant silk blend blouse with a relaxed fit. Features a subtle sheen and delicate button details.',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5,
    reviews: 89,
    newArrival: true
  },
  {
    id: '3',
    name: 'High-Waisted Trousers',
    price: 599,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Tailored high-waisted trousers designed for a sleek, elongating effect. Versatile for office or evening wear.',
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.7,
    reviews: 210,
    bestSeller: true
  },
  {
    id: '4',
    name: 'Cotton Midi Dress',
    price: 799,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Breathable cotton midi dress with a flattering waist tie. Ideal for summer days and casual outings.',
    sizes: ['S', 'M', 'L'],
    rating: 4.6,
    reviews: 156
  },
  {
    id: '5',
    name: 'Structured Blazer',
    price: 899,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A modern blazer with sharp lapels and a boxy fit. Adds instant polish to any outfit.',
    sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.9,
    reviews: 302,
    bestSeller: true
  },
  {
    id: '6',
    name: 'Cashmere Knit Sweater',
    price: 1100,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1624429789310-b97c02c63821?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Luxuriously soft cashmere sweater. Simple, elegant, and incredibly warm.',
    sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8,
    reviews: 95,
    newArrival: true
  }
];
