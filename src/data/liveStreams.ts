import { LiveStream, LiveProduct, LiveComment } from '@/types';
import { products } from './products';

export const liveStreams: LiveStream[] = [
  {
    id: '1',
    title: '春季新品发布会',
    coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    streamerName: '时尚达人小雅',
    streamerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    viewerCount: 1234,
    isLive: true,
    startedAt: new Date('2024-03-15T14:00:00'),
  },
];

export const liveProducts: LiveProduct[] = [
  {
    id: '1',
    streamId: '1',
    product: products[0],
    discountPrice: 799,
    discountEndTime: Date.now() + 3600000,
    displayOrder: 1,
  },
  {
    id: '2',
    streamId: '1',
    product: products[1],
    discountPrice: 1399,
    discountEndTime: Date.now() + 3600000,
    displayOrder: 2,
  },
  {
    id: '3',
    streamId: '1',
    product: products[6],
    discountPrice: 2599,
    discountEndTime: Date.now() + 3600000,
    displayOrder: 3,
  },
  {
    id: '4',
    streamId: '1',
    product: products[10],
    discountPrice: 999,
    discountEndTime: Date.now() + 3600000,
    displayOrder: 4,
  },
  {
    id: '5',
    streamId: '1',
    product: products[2],
    discountPrice: 349,
    discountEndTime: Date.now() + 3600000,
    displayOrder: 5,
  },
];

export const mockComments: LiveComment[] = [
  { id: '1', streamId: '1', userName: '小美', content: '这件外套太好看了！', createdAt: new Date() },
  { id: '2', streamId: '1', userName: '时尚达人', content: '主播穿起来好有气质', createdAt: new Date() },
  { id: '3', streamId: '1', userName: '花花', content: '有优惠吗？', createdAt: new Date() },
  { id: '4', streamId: '1', userName: '小红', content: '已下单！期待收货', createdAt: new Date() },
  { id: '5', streamId: '1', userName: 'Amy', content: '颜色有几种可选？', createdAt: new Date() },
  { id: '6', streamId: '1', userName: '时尚控', content: '直播间价格真划算', createdAt: new Date() },
  { id: '7', streamId: '1', userName: '小雪', content: '主播可以试穿一下吗', createdAt: new Date() },
  { id: '8', streamId: '1', userName: 'Lily', content: '面料是什么材质的？', createdAt: new Date() },
];

export const autoComments = [
  '太美了！',
  '已下单',
  '主播好漂亮',
  '这个价格太划算了',
  '有现货吗？',
  '质量怎么样？',
  '支持主播！',
  '买买买！',
  '颜色很正',
  '尺码偏大还是偏小？',
  '发货快吗？',
  '已关注主播',
  '这个款式很百搭',
  '可以包邮吗？',
  '直播间优惠真多',
];

export const getRandomComment = (): LiveComment => {
  const names = ['小美', '时尚达人', '花花', '小红', 'Amy', '时尚控', '小雪', 'Lily', '小雪儿', '时尚女王'];
  const userName = names[Math.floor(Math.random() * names.length)];
  const content = autoComments[Math.floor(Math.random() * autoComments.length)];
  return {
    id: Date.now().toString() + Math.random(),
    streamId: '1',
    userName,
    content,
    createdAt: new Date(),
  };
};

export const getCurrentStream = (): LiveStream | undefined => {
  return liveStreams.find(s => s.isLive);
};

export const getLiveProducts = (streamId: string): LiveProduct[] => {
  return liveProducts
    .filter(p => p.streamId === streamId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
};
