## 1. 架构设计

```mermaid
flowchart TB
    subgraph Frontend["前端层"]
        Router["React Router"]
        Pages["页面组件"]
        Components["UI组件库"]
        Hooks["自定义Hooks"]
        Store["Zustand状态管理"]
    end
    
    subgraph DataLayer["数据层"]
        LocalStorage["本地存储"]
        MockData["Mock数据"]
    end
    
    Router --> Pages
    Pages --> Components
    Pages --> Hooks
    Hooks --> Store
    Store --> LocalStorage
    Store --> MockData
```

## 2. 技术说明

- **前端框架**：React 18 + TypeScript
- **样式方案**：Tailwind CSS 3 + CSS Variables
- **构建工具**：Vite
- **状态管理**：Zustand（轻量级，适合中小型应用）
- **路由管理**：React Router v6
- **动画库**：Framer Motion
- **图标库**：Lucide React（线性图标风格统一）
- **后端服务**：无（纯前端 Mock 数据）
- **数据存储**：LocalStorage（用户数据、购物车、订单）

## 3. 路由定义

| 路由 | 页面 | 描述 |
|------|------|------|
| `/` | 首页 | 品牌展示、新品、热销商品 |
| `/login` | 登录页 | 邮箱登录 |
| `/register` | 注册页 | 邮箱注册 |
| `/products` | 商品列表 | 分类浏览、筛选 |
| `/products/:id` | 商品详情 | 单品详情页 |
| `/cart` | 购物车 | 购物车管理 |
| `/checkout` | 结算页 | 地址填写、订单确认 |
| `/payment` | 支付页 | Mock支付 |
| `/orders` | 订单列表 | 历史订单 |
| `/orders/:id` | 订单详情 | 单个订单详情 |
| `/account` | 个人中心 | 账户信息 |
| `/contact` | 联系客服 | 邮件表单 |
| `/favorites` | 收藏夹 | 收藏商品列表 |
| `/live` | 直播购物 | 直播视频、互动、商品购买 |
| `*` | 404页面 | 页面不存在 |

## 4. 数据模型

### 4.1 数据模型定义

```mermaid
erDiagram
    User ||--o{ Order : places
    User ||--o{ Address : has
    Order ||--|{ OrderItem : contains
    OrderItem }o--|| Product : references
    Product }o--|| Category : belongs_to
    Product ||--o{ ProductImage : has
    Product ||--o{ Review : has
    Review }o--|| User : written_by
    Cart ||--o{ CartItem : contains
    CartItem }o--|| Product : references
    LiveStream ||--o{ LiveProduct : features
    LiveProduct }o--|| Product : references
    LiveStream ||--o{ LiveComment : has

    User {
        string id PK
        string email
        string password
        string name
        string phone
        datetime created_at
    }
    
    Product {
        string id PK
        string name
        string description
        float price
        float original_price
        string category_id FK
        string[] sizes
        string[] colors
        int stock
        datetime created_at
    }
    
    ProductImage {
        string id PK
        string product_id FK
        string url
        int order
    }
    
    Category {
        string id PK
        string name
        string slug
    }
    
    Order {
        string id PK
        string user_id FK
        string address_id FK
        float total
        string status
        datetime created_at
    }
    
    OrderItem {
        string id PK
        string order_id FK
        string product_id FK
        string size
        int quantity
        float price
    }
    
    Address {
        string id PK
        string user_id FK
        string name
        string phone
        string province
        string city
        string district
        string detail
        boolean is_default
    }
    
    Review {
        string id PK
        string product_id FK
        string user_id FK
        int rating
        string content
        datetime created_at
    }
    
    Cart {
        string id PK
        string user_id FK
        datetime updated_at
    }
    
    CartItem {
        string id PK
        string cart_id FK
        string product_id FK
        string size
        int quantity
    }
    
    LiveStream {
        string id PK
        string title
        string cover_image
        string streamer_name
        int viewer_count
        boolean is_live
        datetime started_at
    }
    
    LiveProduct {
        string id PK
        string stream_id FK
        string product_id FK
        float discount_price
        int discount_end_time
        int display_order
    }
    
    LiveComment {
        string id PK
        string stream_id FK
        string user_name
        string content
        datetime created_at
    }
```

### 4.2 TypeScript 类型定义

```typescript
interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  createdAt: Date;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  sizes: string[];
  colors: string[];
  stock: number;
  images: string[];
  isNew?: boolean;
  isHot?: boolean;
  createdAt: Date;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Order {
  id: string;
  userId: string;
  address: Address;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

interface OrderItem {
  productId: string;
  product: Product;
  size: string;
  quantity: number;
  price: number;
}

interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: Date;
}

interface CartItem {
  productId: string;
  product: Product;
  size: string;
  quantity: number;
}

interface LiveStream {
  id: string;
  title: string;
  coverImage: string;
  streamerName: string;
  viewerCount: number;
  isLive: boolean;
  startedAt: Date;
}

interface LiveProduct {
  id: string;
  streamId: string;
  product: Product;
  discountPrice: number;
  discountEndTime: number;
  displayOrder: number;
}

interface LiveComment {
  id: string;
  streamId: string;
  userName: string;
  content: string;
  createdAt: Date;
}
```

## 5. 状态管理设计

### 5.1 Store 结构

```typescript
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrders: () => Order[];
}

interface AddressStore {
  addresses: Address[];
  addAddress: (address: Address) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
}

interface FavoritesStore {
  items: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

interface LiveStore {
  currentStream: LiveStream | null;
  liveProducts: LiveProduct[];
  comments: LiveComment[];
  viewerCount: number;
  addComment: (comment: LiveComment) => void;
  setViewerCount: (count: number) => void;
}
```

## 6. 项目目录结构

```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Loading.tsx
│   │   └── EmptyState.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Layout.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── SizeSelector.tsx
│   │   └── ReviewList.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── home/
│   │   ├── HeroCarousel.tsx
│   │   ├── NewArrivals.tsx
│   │   ├── HotProducts.tsx
│   │   └── WelcomeModal.tsx
│   └── live/
│       ├── LiveVideo.tsx
│       ├── LiveComments.tsx
│       ├── LiveProducts.tsx
│       └── LiveInteraction.tsx
├── pages/
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Products.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Payment.tsx
│   ├── Orders.tsx
│   ├── OrderDetail.tsx
│   ├── Account.tsx
│   ├── Contact.tsx
│   ├── Favorites.tsx
│   ├── Live.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useOrders.ts
│   └── useLocalStorage.ts
├── store/
│   ├── authStore.ts
│   ├── cartStore.ts
│   ├── orderStore.ts
│   ├── addressStore.ts
│   ├── favoritesStore.ts
│   └── liveStore.ts
├── data/
│   ├── products.ts
│   ├── categories.ts
│   ├── reviews.ts
│   └── liveStreams.ts
├── utils/
│   ├── format.ts
│   └── validation.ts
├── styles/
│   └── globals.css
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## 7. Mock 数据策略

- 商品数据：预定义 20-30 个商品，包含不同分类
- 分类数据：外套、连衣裙、上衣、裤装、裙装、配饰
- 用户评价：每个商品预置 3-5 条评价
- 用户数据：存储在 LocalStorage
- 购物车数据：存储在 LocalStorage
- 订单数据：存储在 LocalStorage
- 直播数据：预定义直播信息、直播商品、模拟弹幕
