# 技术架构文档

## 技术栈

### 核心框架
- **React 18**: 前端UI框架
- **TypeScript**: 类型安全
- **Vite**: 构建工具和开发服务器

### 状态管理
- **Zustand**: 轻量级状态管理
  - 用户状态 (useUserStore)
  - 购物车状态 (useCartStore)
  - 商品状态 (useProductStore)
  - 订单状态 (useOrderStore)

### 路由
- **React Router v6**: 客户端路由

### 样式方案
- **Tailwind CSS**: 原子化CSS框架
- **PostCSS**: CSS后处理器
- **自定义CSS变量**: 主题色彩管理

### 动画
- **Framer Motion**: React动画库
- **CSS Transitions**: 基础过渡效果

### 图标
- **Lucide React**: 线性图标库

## 项目结构

```
lumiere-fashion/
├── public/
│   └── images/           # 静态图片资源
├── src/
│   ├── assets/           # 需要构建的资源
│   ├── components/       # 可复用组件
│   │   ├── common/       # 通用组件
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── layout/       # 布局组件
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── product/      # 商品相关组件
│   │       ├── ProductCard.tsx
│   │       ├── ProductGrid.tsx
│   │       └── ...
│   ├── pages/            # 页面组件
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Products.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Orders.tsx
│   │   ├── OrderDetail.tsx
│   │   ├── Contact.tsx
│   │   └── ComingSoon.tsx
│   ├── stores/           # Zustand状态管理
│   │   ├── userStore.ts
│   │   ├── cartStore.ts
│   │   ├── productStore.ts
│   │   └── orderStore.ts
│   ├── data/             # Mock数据
│   │   ├── products.ts
│   │   └── ...
│   ├── hooks/            # 自定义Hooks
│   │   ├── useLocalStorage.ts
│   │   └── ...
│   ├── utils/            # 工具函数
│   │   ├── format.ts
│   │   └── validation.ts
│   ├── types/            # TypeScript类型定义
│   │   └── index.ts
│   ├── styles/           # 全局样式
│   │   └── globals.css
│   ├── App.tsx           # 根组件
│   └── main.tsx          # 入口文件
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## 数据模型

### 用户 (User)
```typescript
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  createdAt: Date;
}
```

### 商品 (Product)
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: string[];
  description: string;
  stock: number;
  sales: number;
  isNew: boolean;
  isHot: boolean;
  rating: number;
  reviews: Review[];
}
```

### 评价 (Review)
```typescript
interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  date: Date;
  size: string;
}
```

### 购物车项 (CartItem)
```typescript
interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}
```

### 订单 (Order)
```typescript
interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  shippingAddress: Address;
  createdAt: Date;
  paidAt?: Date;
}

interface Address {
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
}
```

## 状态管理设计

### 用户状态 (userStore)
```typescript
interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}
```

### 购物车状态 (cartStore)
```typescript
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}
```

### 商品状态 (productStore)
```typescript
interface ProductState {
  products: Product[];
  categories: string[];
  fetchProducts: () => void;
  getProductById: (id: string) => Product | undefined;
  getNewArrivals: () => Product[];
  getBestSellers: () => Product[];
}
```

### 订单状态 (orderStore)
```typescript
interface OrderState {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Order;
  getOrdersByUser: (userId: string) => Order[];
  getOrderById: (id: string) => Order | undefined;
}
```

## API 设计 (Mock)

### 商品相关
- `GET /api/products` - 获取商品列表
- `GET /api/products/:id` - 获取商品详情
- `GET /api/products?category=xxx` - 按分类获取
- `GET /api/products?sort=new` - 按新品排序
- `GET /api/products?sort=hot` - 按热销排序

### 用户相关
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出

### 订单相关
- `GET /api/orders` - 获取订单列表
- `POST /api/orders` - 创建订单
- `GET /api/orders/:id` - 获取订单详情

## 组件设计规范

### 命名规范
- 组件文件使用 PascalCase: `ProductCard.tsx`
- 样式类使用 kebab-case: `product-card`
- 状态变量使用 camelCase: `isLoading`

### 组件结构
```typescript
// 导入
import { useState } from 'react';
import { motion } from 'framer-motion';

// 类型定义
interface Props {
  title: string;
}

// 组件定义
export const Component: React.FC<Props> = ({ title }) => {
  // 状态
  const [state, setState] = useState();

  // 副作用
  useEffect(() => {}, []);

  // 事件处理
  const handleClick = () => {};

  // 渲染
  return (
    <motion.div>
      {/* 内容 */}
    </motion.div>
  );
};
```

## 响应式断点

```css
/* Tailwind 默认断点 */
sm: 640px   /* 手机横屏 */
md: 768px   /* 平板 */
lg: 1024px  /* 小屏电脑 */
xl: 1280px  /* 桌面 */
2xl: 1536px /* 大屏 */
```

## 性能优化策略

1. **图片优化**
   - 使用 WebP 格式
   - 懒加载图片
   - 响应式图片

2. **代码分割**
   - 路由级别懒加载
   - 组件按需加载

3. **缓存策略**
   - LocalStorage 缓存用户数据
   - 商品数据内存缓存

4. **动画优化**
   - 使用 transform 和 opacity
   - 避免重排重绘
   - will-change 提示

## 安全考虑

1. **XSS防护**: React 自动转义
2. **敏感数据**: 密码不明文存储（演示用简化处理）
3. **输入验证**: 前端表单验证
4. **CSRF**: Mock环境暂不考虑

## 部署配置

### 构建命令
```bash
npm run build
```

### 预览命令
```bash
npm run preview
```

### 环境变量
```
VITE_APP_TITLE=LUMIÈRE
VITE_APP_DESCRIPTION=时尚女装电商平台
```
