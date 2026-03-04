# Technical Architecture: Aura - Modern Women's Fashion E-commerce

## 1. System Overview
**Architecture:** Single Page Application (SPA) using React.
**Backend Strategy:** Client-side mocking (Mock Service Worker or local JSON server) for rapid prototyping and demonstration purposes. No real backend server initially.

## 2. Technology Stack

### 2.1 Frontend Framework
- **React (Vite):** Chosen for performance, developer experience, and vast ecosystem.
- **TypeScript:** Ensuring type safety and maintainability.

### 2.2 Styling & UI
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development and consistent design system.
- **Lucide React:** Consistent, modern icon set.
- **Framer Motion:** For smooth, high-quality animations and transitions.

### 2.3 State Management
- **Zustand:** Lightweight, scalable state management solution for global application state (cart, user, theme).

### 2.4 Routing
- **React Router:** For client-side routing and navigation.

### 2.5 Data Handling (Mock)
- **Mock Service Worker (MSW) / Local Storage:** To simulate API responses and persist user data (cart, orders) across sessions.

### 2.6 Build & Tooling
- **Vite:** Next-generation frontend tooling.
- **ESLint / Prettier:** Code quality and formatting.

## 3. Component Architecture

### 3.1 Core Components
- `App`: Root component, handles routing and global providers.
- `Layout`: Main layout wrapper (Header, Footer).
- `Header`: Navigation, Search, Cart Icon, User Profile.
- `Footer`: Links, Newsletter Signup, Social Icons.
- `Button`: Primary/Secondary buttons with loading states.
- `Input`: Standard input fields with validation.
- `Modal`: Reusable modal component (e.g., New User Popup).
- `ProductCard`: Displays product image, title, price.
- `CartItem`: Component for cart list items.

### 3.2 Page Components
- `HomePage`: Hero carousel, featured sections.
- `ProductListPage`: Grid view of products with filters.
- `ProductDetailPage`: Detailed product view, size selector, reviews.
- `CartPage`: Cart management.
- `CheckoutPage`: Address form, payment selection (mock).
- `OrderHistoryPage`: List of past orders.
- `AuthPage`: Login/Register forms.
- `ContactPage`: Simple contact form.
- `NotFoundPage`: 404 page.

## 4. Data Models

### 4.1 User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  address?: Address;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string; // Default to 'China'
}
```

### 4.2 Product
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // For sale items
  description: string;
  images: string[];
  sizes: string[]; // e.g., ['S', 'M', 'L']
  colors: string[];
  category: string;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
}
```

### 4.3 Cart & Order
```typescript
interface CartItem {
  productId: string;
  quantity: number;
  size: string;
  color: string;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string; // ISO date string
  shippingAddress: Address;
}
```

## 5. API Design (Mock)

### 5.1 Endpoints
- `GET /api/products`: Fetch all products (with optional filters).
- `GET /api/products/:id`: Fetch product details.
- `POST /api/auth/login`: Authenticate user.
- `POST /api/auth/register`: Create new user.
- `GET /api/cart`: Get current user's cart.
- `POST /api/cart`: Add item to cart.
- `PUT /api/cart/:itemId`: Update item quantity.
- `DELETE /api/cart/:itemId`: Remove item from cart.
- `POST /api/checkout`: Process order (mock payment).
- `GET /api/orders`: Get user's order history.

## 6. Security Considerations
- **Data Validation:** Validate all inputs (email format, required fields).
- **HTTPS:** Ensure secure communication (even if mock backend).
- **Mock Payment:** Explicitly state that payment is simulated for demo purposes.

## 7. Performance Optimization
- **Image Optimization:** Use responsive images (WebP/AVIF) and lazy loading.
- **Code Splitting:** Use React.lazy for route-based code splitting.
- **Caching:** Leverage browser caching for static assets.
