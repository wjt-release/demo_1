import { Post, Comment } from '@/types';
import { products } from './products';

export const postTags = [
  '穿搭分享',
  '日常穿搭',
  '职场穿搭',
  '约会穿搭',
  '度假穿搭',
  '新品测评',
  '好物推荐',
  '搭配技巧',
  '时尚趋势',
  '显瘦穿搭',
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: 'user1',
    userName: '时尚达人小雅',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    title: '春季必备！显瘦又时髦的穿搭分享',
    content: '春天来了，分享几套我最喜欢的春季穿搭！这套搭配非常适合日常通勤，既舒适又时尚。外套选择了今年流行的卡其色风衣，内搭白色衬衫，下装是高腰阔腿裤，显高又显瘦。',
    postType: 'image',
    media: [
      { id: 'm1', postId: '1', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80', mediaType: 'image', displayOrder: 1 },
      { id: 'm2', postId: '1', url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80', mediaType: 'image', displayOrder: 2 },
      { id: 'm3', postId: '1', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80', mediaType: 'image', displayOrder: 3 },
    ],
    tags: ['穿搭分享', '日常穿搭', '显瘦穿搭'],
    products: [products[0], products[2]],
    likesCount: 1234,
    favoritesCount: 567,
    commentsCount: 89,
    createdAt: new Date('2024-03-15'),
  },
  {
    id: '2',
    userId: 'user2',
    userName: '花花的世界',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    title: '这条连衣裙太美了！约会必备',
    content: '最近入手的这条连衣裙真的太惊艳了！面料很有质感，版型也很显瘦。穿上它去约会，男朋友都夸好看。推荐给姐妹们！',
    postType: 'image',
    media: [
      { id: 'm4', postId: '2', url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80', mediaType: 'image', displayOrder: 1 },
      { id: 'm5', postId: '2', url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80', mediaType: 'image', displayOrder: 2 },
    ],
    tags: ['约会穿搭', '连衣裙', '好物推荐'],
    products: [products[1], products[7]],
    likesCount: 2345,
    favoritesCount: 890,
    commentsCount: 156,
    createdAt: new Date('2024-03-14'),
  },
  {
    id: '3',
    userId: 'user3',
    userName: '职场丽人Amy',
    userAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80',
    title: '职场穿搭不踩雷！优雅又干练',
    content: '分享我的职场穿搭心得！作为职场女性，既要展现专业形象，又要保持优雅气质。这套西装外套搭配高腰裤，完美平衡了这两点。',
    postType: 'image',
    media: [
      { id: 'm6', postId: '3', url: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80', mediaType: 'image', displayOrder: 1 },
    ],
    tags: ['职场穿搭', '搭配技巧', '西装'],
    products: [products[6]],
    likesCount: 876,
    favoritesCount: 345,
    commentsCount: 67,
    createdAt: new Date('2024-03-13'),
  },
  {
    id: '4',
    userId: 'user4',
    userName: '度假女孩Lily',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    title: '海边度假穿搭灵感 ☀️',
    content: '准备去海边度假的姐妹看过来！这套度假穿搭超级出片，飘逸的连衣裙配上草编帽，浪漫又清新。',
    postType: 'image',
    media: [
      { id: 'm7', postId: '4', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', mediaType: 'image', displayOrder: 1 },
      { id: 'm8', postId: '4', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', mediaType: 'image', displayOrder: 2 },
    ],
    tags: ['度假穿搭', '连衣裙', '海边'],
    products: [products[1]],
    likesCount: 3456,
    favoritesCount: 1234,
    commentsCount: 234,
    createdAt: new Date('2024-03-12'),
  },
  {
    id: '5',
    userId: 'user5',
    userName: '时尚博主小雪',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    title: '2024春季流行趋势解读',
    content: '今年春季流行什么？让我来告诉你！卡其色、奶油白、淡粉色是今年春天的主打色系。宽松版型、高腰设计依然是大热趋势。',
    postType: 'image',
    media: [
      { id: 'm9', postId: '5', url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80', mediaType: 'image', displayOrder: 1 },
      { id: 'm10', postId: '5', url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80', mediaType: 'image', displayOrder: 2 },
      { id: 'm11', postId: '5', url: 'https://images.unsplash.com/photo-1485968579169-a6b7e100eb5b?w=800&q=80', mediaType: 'image', displayOrder: 3 },
      { id: 'm12', postId: '5', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80', mediaType: 'image', displayOrder: 4 },
    ],
    tags: ['时尚趋势', '春季穿搭', '搭配技巧'],
    products: [products[0], products[2], products[3]],
    likesCount: 5678,
    favoritesCount: 2345,
    commentsCount: 456,
    createdAt: new Date('2024-03-11'),
  },
  {
    id: '6',
    userId: 'user6',
    userName: '穿搭日记',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    title: '小个子女生显高穿搭秘籍',
    content: '身高158的我，通过穿搭技巧也能穿出170的既视感！高腰线是关键，短上衣+高腰裤是永远的神搭配。',
    postType: 'image',
    media: [
      { id: 'm13', postId: '6', url: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&q=80', mediaType: 'image', displayOrder: 1 },
    ],
    tags: ['显瘦穿搭', '搭配技巧', '小个子'],
    products: [products[3], products[4]],
    likesCount: 2345,
    favoritesCount: 987,
    commentsCount: 178,
    createdAt: new Date('2024-03-10'),
  },
];

export const mockComments: Comment[] = [
  { id: 'c1', postId: '1', userId: 'u1', userName: '小美', content: '太好看了！求链接', likesCount: 23, createdAt: new Date('2024-03-15') },
  { id: 'c2', postId: '1', userId: 'u2', userName: '时尚达人', content: '这套搭配真的绝了', likesCount: 15, createdAt: new Date('2024-03-15') },
  { id: 'c3', postId: '1', userId: 'u3', userName: '花花', content: '风衣哪里买的？', likesCount: 8, createdAt: new Date('2024-03-15') },
  { id: 'c4', postId: '2', userId: 'u4', userName: 'Amy', content: '连衣裙太美了！', likesCount: 45, createdAt: new Date('2024-03-14') },
  { id: 'c5', postId: '2', userId: 'u5', userName: 'Lily', content: '约会穿这套一定很惊艳', likesCount: 32, createdAt: new Date('2024-03-14') },
  { id: 'c6', postId: '3', userId: 'u6', userName: '职场新人', content: '学到了！职场穿搭不踩雷', likesCount: 18, createdAt: new Date('2024-03-13') },
  { id: 'c7', postId: '4', userId: 'u7', userName: '旅行者', content: '海边拍照一定很出片！', likesCount: 56, createdAt: new Date('2024-03-12') },
  { id: 'c8', postId: '5', userId: 'u8', userName: '时尚爱好者', content: '趋势分析很到位！', likesCount: 67, createdAt: new Date('2024-03-11') },
];

export const getPostById = (id: string): Post | undefined => {
  return mockPosts.find(p => p.id === id);
};

export const getCommentsByPostId = (postId: string): Comment[] => {
  return mockComments.filter(c => c.postId === postId);
};

export const getPostsByTag = (tag: string): Post[] => {
  return mockPosts.filter(p => p.tags.includes(tag));
};

export const getAllTags = (): string[] => {
  return postTags;
};
