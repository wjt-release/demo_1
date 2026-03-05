# Technical Architecture Document

## 1. Tech Stack
-   **Frontend Framework:** React 18+ (bootstrapped with Vite)
-   **Language:** JavaScript (ES6+) or TypeScript (recommended for scalability)
-   **Styling:** Tailwind CSS (for utility-first styling), CSS Modules (for complex component styles if needed)
-   **State Management:** Zustand (lightweight, easy to use for global state like Cart and User)
-   **Routing:** React Router DOM v6
-   **Icons:** Lucide React (clean, consistent SVG icons)
-   **Build Tool:** Vite
-   **Package Manager:** npm or yarn

## 2. Project Structure
```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── common/      # Generic components (Button, Input, Modal, Loader)
│   ├── layout/      # Layout components (Header, Footer, Navbar)
│   ├── product/     # Product-related components (Card, List, Gallery)
│   └── cart/        # Cart-related components (Item, Summary)
├── pages/           # Route components (Home, ProductList, ProductDetail, Cart, Checkout, Profile, Login, Register)
├── hooks/           # Custom React hooks (useCart, useAuth, useProducts)
├── store/           # Global state stores (cartStore, userStore, uiStore)
├── utils/           # Helper functions (formatCurrency, validators)
├── mock/            # Mock data (products.json, users.json)
├── App.jsx          # Main application component
└── main.jsx         # Entry point
```

## 3. Data Model (Mock)

### 3.1 Product
```json
{
  "id": "p1",
  "name": "Classic Wool Coat",
  "price": 899,
  "currency": "CNY",
  "images": ["url1", "url2"],
  "sizes": ["S", "M", "L"],
  "colors": ["Black", "Beige"],
  "description": "A timeless wool coat...",
  "category": "Outerwear",
  "rating": 4.8,
  "reviews": 120
}
```

### 3.2 User
```json
{
  "id": "u1",
  "email": "user@example.com",
  "name": "Jane Doe",
  "orders": []
}
```

### 3.3 Order
```json
{
  "id": "o1",
  "userId": "u1",
  "items": [
    { "productId": "p1", "quantity": 1, "size": "M", "color": "Beige" }
  ],
  "total": 899,
  "status": "Completed",
  "date": "2023-10-27"
}
```

## 4. Key Implementation Details

### 4.1 State Management (Zustand)
-   **Cart Store:** `items`, `addItem`, `removeItem`, `updateQuantity`, `clearCart`, `totalPrice`.
-   **User Store:** `currentUser`, `login`, `logout`, `register`, `addOrder`.
-   **UI Store:** `isCartOpen`, `isMenuOpen`, `modalOpen`.

### 4.2 Routing
-   `/` - Home
-   `/shop` - Product List
-   `/product/:id` - Product Detail
-   `/cart` - Shopping Cart
-   `/checkout` - Checkout Process
-   `/login` - Login
-   `/register` - Register
-   `/profile` - User Profile / Order History
-   `*` - 404 Not Found

### 4.3 Styling Strategy
-   Use Tailwind utility classes for layout, spacing, and typography.
-   Define custom colors in `tailwind.config.js` to match the "Zara/H&M" aesthetic (Black, White, Gray, Beige, Deep Blue).
-   Use responsive prefixes (`md:`, `lg:`) for mobile-first design.

### 4.4 Mock Payment
-   Simulate payment delay (e.g., 1-2 seconds) with a loading spinner.
-   On success, clear cart, create order record, and redirect to Order Success/History page.

## 5. Development Phases
1.  **Setup:** Initialize project, install dependencies (Tailwind, Router, Zustand, Lucide).
2.  **Components:** Build core UI components (Header, Footer, Product Card).
3.  **Pages:** Implement Home, PLP, PDP.
4.  **Logic:** Connect Cart and Auth logic with Zustand.
5.  **Checkout:** Implement Checkout flow and Mock Payment.
6.  **Refinement:** Add animations, responsive tweaks, and "Coming Soon" states.
