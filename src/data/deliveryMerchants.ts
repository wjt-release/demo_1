import { DeliveryMerchant, DeliveryProduct, DeliveryReview } from '@/types';
import { products } from './products';

export const deliveryMerchants: DeliveryMerchant[] = [
  {
    id: '1',
    name: '时尚速递',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
    description: '专注女装快递服务，24小时极速送达。专业包装，确保商品完好无损。',
    rating: 4.9,
    reviewCount: 2341,
    deliveryTimeMin: 24,
    deliveryTimeMax: 48,
    minOrderAmount: 99,
    deliveryFee: 0,
    deliveryAreas: ['北京', '上海', '广州', '深圳', '杭州', '南京', '成都', '武汉'],
    tags: ['极速配送', '免运费', '专业包装'],
  },
  {
    id: '2',
    name: '优雅配送',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1920&q=80',
    description: '高端女装专属配送服务，提供白手套送货上门。',
    rating: 4.8,
    reviewCount: 1856,
    deliveryTimeMin: 48,
    deliveryTimeMax: 72,
    minOrderAmount: 199,
    deliveryFee: 15,
    deliveryAreas: ['北京', '上海', '广州', '深圳', '杭州'],
    tags: ['白手套服务', '精美包装', '高端配送'],
  },
  {
    id: '3',
    name: '同城闪送',
    logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1556742077-0a6b6a4a4ac9?w=1920&q=80',
    description: '同城3小时极速送达，新鲜直达。',
    rating: 4.7,
    reviewCount: 1234,
    deliveryTimeMin: 3,
    deliveryTimeMax: 6,
    minOrderAmount: 299,
    deliveryFee: 20,
    deliveryAreas: ['北京', '上海', '广州', '深圳'],
    tags: ['3小时达', '同城配送', '实时追踪'],
  },
  {
    id: '4',
    name: '精品专线',
    logo: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1556742408-c57860a3d23b?w=1920&q=80',
    description: '恒温配送，试穿服务，不满意当场退换。',
    rating: 4.9,
    reviewCount: 987,
    deliveryTimeMin: 72,
    deliveryTimeMax: 120,
    minOrderAmount: 299,
    deliveryFee: 25,
    deliveryAreas: ['北京', '上海', '广州', '深圳'],
    tags: ['恒温配送', '试穿服务', '当面退换'],
  },
  {
    id: '5',
    name: '快捷物流',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&q=80',
    coverImage: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c6?w=1920&q=80',
    description: '全国配送，覆盖面广，价格实惠。',
    rating: 4.6,
    reviewCount: 3567,
    deliveryTimeMin: 48,
    deliveryTimeMax: 96,
    minOrderAmount: 49,
    deliveryFee: 8,
    deliveryAreas: ['全国'],
    tags: ['全国配送', '价格实惠', '覆盖面广'],
  },
];

export const deliveryProducts: DeliveryProduct[] = [
  { id: '1', merchantId: '1', product: products[0], price: products[0].price, category: '外套', displayOrder: 1 },
  { id: '2', merchantId: '1', product: products[1], price: products[1].price, category: '连衣裙', displayOrder: 2 },
  { id: '3', merchantId: '1', product: products[6], price: products[6].price, category: '外套', displayOrder: 3 },
  { id: '4', merchantId: '1', product: products[2], price: products[2].price, category: '上衣', displayOrder: 4 },
  { id: '5', merchantId: '1', product: products[3], price: products[3].price, category: '裤装', displayOrder: 5 },
  { id: '6', merchantId: '2', product: products[0], price: products[0].price, category: '外套', displayOrder: 1 },
  { id: '7', merchantId: '2', product: products[6], price: products[6].price, category: '外套', displayOrder: 2 },
  { id: '8', merchantId: '2', product: products[10], price: products[10].price, category: '配饰', displayOrder: 3 },
  { id: '9', merchantId: '3', product: products[1], price: products[1].price, category: '连衣裙', displayOrder: 1 },
  { id: '10', merchantId: '3', product: products[7], price: products[7].price, category: '连衣裙', displayOrder: 2 },
  { id: '11', merchantId: '3', product: products[2], price: products[2].price, category: '上衣', displayOrder: 3 },
  { id: '12', merchantId: '4', product: products[0], price: products[0].price, category: '外套', displayOrder: 1 },
  { id: '13', merchantId: '4', product: products[6], price: products[6].price, category: '外套', displayOrder: 2 },
  { id: '14', merchantId: '5', product: products[0], price: products[0].price, category: '外套', displayOrder: 1 },
  { id: '15', merchantId: '5', product: products[1], price: products[1].price, category: '连衣裙', displayOrder: 2 },
];

export const deliveryReviews: DeliveryReview[] = [
  { id: '1', merchantId: '1', userName: '小美', rating: 5, content: '配送超快，包装精美', createdAt: new Date('2024-03-10') },
  { id: '2', merchantId: '1', userName: '时尚达人', rating: 5, content: '24小时就到了，太惊喜了', createdAt: new Date('2024-03-08') },
  { id: '3', merchantId: '2', userName: '花花', rating: 5, content: '白手套服务很贴心', createdAt: new Date('2024-03-09') },
  { id: '4', merchantId: '2', userName: 'Amy', rating: 4, content: '服务很好，就是价格稍贵', createdAt: new Date('2024-03-07') },
  { id: '5', merchantId: '3', userName: '小雪', rating: 5, content: '3小时真的送到了', createdAt: new Date('2024-03-11') },
  { id: '6', merchantId: '3', userName: 'Lily', rating: 4, content: '同城配送很方便', createdAt: new Date('2024-03-06') },
  { id: '7', merchantId: '4', userName: '时尚女王', rating: 5, content: '试穿服务太贴心了', createdAt: new Date('2024-03-04') },
  { id: '8', merchantId: '5', userName: '小红', rating: 4, content: '偏远地区也能送，很感动', createdAt: new Date('2024-03-03') },
];

export const getMerchantById = (id: string): DeliveryMerchant | undefined => {
  return deliveryMerchants.find(m => m.id === id);
};

export const getProductsByMerchant = (merchantId: string): DeliveryProduct[] => {
  return deliveryProducts
    .filter(p => p.merchantId === merchantId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getReviewsByMerchant = (merchantId: string): DeliveryReview[] => {
  return deliveryReviews.filter(r => r.merchantId === merchantId);
};

export const getMerchantCategories = (merchantId: string): string[] => {
  const merchantProducts = getProductsByMerchant(merchantId);
  const categories = new Set(merchantProducts.map(p => p.category));
  return Array.from(categories);
};
