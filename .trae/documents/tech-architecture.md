# Technical Architecture Document - LUMINA Fashion

## 1. Tech Stack

### Frontend Framework
-   **React 18+**: Functional components, Hooks.
-   **Vite**: Fast build tool and dev server.
-   **Language**: TypeScript (recommended for type safety) or JavaScript (ES6+).

### Styling & UI
-   **Tailwind CSS**: Utility-first CSS framework for rapid, responsive design.
-   **Framer Motion**: For smooth animations and transitions (hero carousel, modal popups, page transitions).
-   **Icons**: `lucide-react` for consistent, clean SVG icons.

### State Management
-   **Zustand**: Lightweight state management for Cart, User Session, and UI states (modals, drawers).
-   **React Context**: For theme or global configurations if needed.

### Routing
-   **React Router v6**: Standard client-side routing.

### Data & Mocking
-   **Mock Data**: JSON files or simple in-memory objects to simulate backend responses (Products, Users, Orders).
-   **LocalStorage**: Persist Cart and User Session across reloads.

## 2. Project Structure

```
src/
├── assets/          # Images, fonts, global styles
├── components/      # Reusable UI components
│   ├── common/      # Button, Input, Modal, etc.
│   ├── layout/      # Header, Footer, Layout wrapper
│   └── product/     # ProductCard, ProductGrid
├── pages/           # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── ProductList.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   └── OrderHistory.tsx
├── hooks/           # Custom hooks (useCart, useAuth)
├── store/           # Zustand stores (cartStore, authStore)
├── types/           # TypeScript interfaces (Product, User, Order)
├── utils/           # Helper functions (formatPrice, validators)
└── App.tsx          # Main entry with Routing
```

## 3. Key Technical Decisions

### 3.1 Responsiveness
-   Mobile-first approach using Tailwind's breakpoints (`sm`, `md`, `lg`, `xl`).
-   Grid layouts for product listings.
-   Flexbox for alignment and layout structure.

### 3.2 State Management Strategy
-   **Cart Store**: Actions to add, remove, update quantity, clear cart. Persisted to `localStorage`.
-   **Auth Store**: Actions to login (mock), logout, register (mock). Stores user token/info in `localStorage`.
-   **Product Store**: Fetches mock data, handles filtering/sorting locally.

### 3.3 Mock Payment Flow
-   Simulate API call with `setTimeout`.
-   On success, clear cart, create order record in `OrderHistory` (stored in `localStorage`), and redirect to Order History or Success page.

### 3.4 Animations
-   **Page Transitions**: Fade in/out.
-   **Micro-interactions**: Button hover scales, Cart icon bounce, Modal slide-in.

## 4. Deployment
-   **Platform**: Vercel or Netlify (Zero-config deployment for Vite/React apps).
-   **CI/CD**: GitHub Actions (optional, for future).
