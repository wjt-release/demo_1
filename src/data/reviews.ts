import { Review } from '@/types';

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'u1',
    userName: '小雅',
    rating: 5,
    content: '质量很好，版型正，穿着很显瘦！面料也很舒服，推荐购买。',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '2',
    productId: '1',
    userId: 'u2',
    userName: '时尚达人',
    rating: 4,
    content: '衣服质量不错，就是稍微有点大，建议选小一码。',
    createdAt: new Date('2024-01-28'),
  },
  {
    id: '3',
    productId: '1',
    userId: 'u3',
    userName: '职场女性',
    rating: 5,
    content: '非常满意！做工精细，面料有质感，穿上去很有气质。',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '4',
    productId: '2',
    userId: 'u4',
    userName: '优雅女士',
    rating: 5,
    content: '真丝面料非常舒服，版型优雅，参加宴会很合适。',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: '5',
    productId: '2',
    userId: 'u5',
    userName: '美丽人生',
    rating: 5,
    content: '裙子很漂亮，穿上很显瘦，颜色也很正。',
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80'],
    createdAt: new Date('2024-02-03'),
  },
  {
    id: '6',
    productId: '3',
    userId: 'u6',
    userName: '简约生活',
    rating: 4,
    content: '白衬衫质量很好，百搭实用，就是需要熨烫。',
    createdAt: new Date('2024-01-30'),
  },
  {
    id: '7',
    productId: '3',
    userId: 'u7',
    userName: '都市丽人',
    rating: 5,
    content: '面料很舒服，版型正，性价比高！',
    createdAt: new Date('2024-01-27'),
  },
  {
    id: '8',
    productId: '4',
    userId: 'u8',
    userName: '小个子女生',
    rating: 5,
    content: '高腰设计很显腿长，阔腿版型遮肉显瘦，非常满意！',
    createdAt: new Date('2024-02-02'),
  },
  {
    id: '9',
    productId: '4',
    userId: 'u9',
    userName: '办公室白领',
    rating: 4,
    content: '裤子质量不错，垂感很好，就是腰围稍微有点大。',
    createdAt: new Date('2024-01-29'),
  },
  {
    id: '10',
    productId: '5',
    userId: 'u10',
    userName: '温柔女子',
    rating: 5,
    content: '针织开衫很柔软，颜色也很温柔，春天穿刚刚好。',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '11',
    productId: '6',
    userId: 'u11',
    userName: '甜美女孩',
    rating: 5,
    content: '百褶裙很飘逸，版型好看，搭配衬衫很优雅。',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: '12',
    productId: '7',
    userId: 'u12',
    userName: '品质追求者',
    rating: 5,
    content: '羊绒大衣质感非常好，保暖性极佳，值得投资！',
    createdAt: new Date('2024-02-08'),
  },
  {
    id: '13',
    productId: '8',
    userId: 'u13',
    userName: '度假达人',
    rating: 4,
    content: '印花很漂亮，裙子很飘逸，适合度假穿。',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '14',
    productId: '9',
    userId: 'u14',
    userName: '牛仔裤控',
    rating: 5,
    content: '版型很好，显瘦显高，弹性也不错，非常满意！',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '15',
    productId: '10',
    userId: 'u15',
    userName: '配饰爱好者',
    rating: 5,
    content: '丝巾很漂亮，真丝材质很舒服，系法多样，很喜欢！',
    createdAt: new Date('2024-01-15'),
  },
];

export const getReviewsByProductId = (productId: string): Review[] => {
  return reviews.filter(r => r.productId === productId);
};

export const getAverageRating = (productId: string): number => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productReviews.length) * 10) / 10;
};
