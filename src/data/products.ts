export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  category: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  details: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: '极简主义羊毛混纺大衣',
    price: 1299,
    originalPrice: 1599,
    description: '这款精美的大衣采用优质羊毛混纺面料制成，设计简洁大方，是秋冬季节的理想选择。',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['黑色', '米色', '深蓝色'],
    category: '外套',
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isBestSeller: true,
    details: [
      '面料: 70% 羊毛, 30% 聚酯纤维',
      '衬里: 100% 粘胶纤维',
      '经典翻领设计',
      '正面双排扣闭合',
      '两侧设有口袋'
    ]
  },
  {
    id: '2',
    name: '丝绸质感系带连衣裙',
    price: 599,
    description: '优雅的丝绸质感连衣裙，腰部系带设计能够完美修饰身形，适合各种正式或休闲场合。',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['黑色', '深蓝色'],
    category: '连衣裙',
    rating: 4.6,
    reviewCount: 89,
    isNew: true,
    isBestSeller: false,
    details: [
      '面料: 100% 聚酯纤维',
      '腰部可调节系带',
      '长袖设计',
      '背部隐形拉链'
    ]
  },
  {
    id: '3',
    name: '高腰直筒牛仔裤',
    price: 399,
    originalPrice: 459,
    description: '经典的高腰直筒设计，修饰腿型，舒适耐穿，是衣橱中不可或缺的单品。',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['25', '26', '27', '28', '29', '30'],
    colors: ['蓝色', '浅蓝色', '黑色'],
    category: '裤装',
    rating: 4.7,
    reviewCount: 215,
    isNew: false,
    isBestSeller: true,
    details: [
      '面料: 99% 棉, 1% 弹性纤维',
      '五口袋设计',
      '高腰剪裁',
      '直筒版型'
    ]
  },
  {
    id: '4',
    name: '宽松版型棉质衬衫',
    price: 299,
    description: '采用优质棉面料，手感柔软，宽松版型带来随性自在的穿着体验。',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1604691659443-22199e12693b?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['白色', '浅蓝色', '条纹'],
    category: '上装',
    rating: 4.5,
    reviewCount: 156,
    isNew: false,
    isBestSeller: true,
    details: [
      '面料: 100% 棉',
      '正面纽扣闭合',
      '落肩设计',
      '可调节袖口'
    ]
  },
  {
    id: '5',
    name: 'V领羊绒衫',
    price: 899,
    description: '纯羊绒材质，极致亲肤保暖，简约V领设计，单穿或叠穿皆宜。',
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['米色', '灰色', '黑色'],
    category: '针织',
    rating: 4.9,
    reviewCount: 78,
    isNew: true,
    isBestSeller: false,
    details: [
      '面料: 100% 羊绒',
      '罗纹领口、袖口和下摆',
      'V领设计',
      '修身版型'
    ]
  },
  {
    id: '6',
    name: '复古格纹西装外套',
    price: 799,
    description: '经典的格纹设计，带有一丝复古韵味，利落的剪裁让您在职场中也充满魅力。',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&q=80&w=800'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['棕色格纹', '灰色格纹'],
    category: '外套',
    rating: 4.7,
    reviewCount: 65,
    isNew: false,
    isBestSeller: true,
    details: [
      '面料: 65% 聚酯纤维, 33% 粘胶纤维, 2% 弹性纤维',
      '全内衬设计',
      '垫肩设计',
      '后片开叉'
    ]
  }
];
