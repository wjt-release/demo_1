# Product Requirements Document (PRD) - LUMINA Fashion

## 1. Introduction
**Project Name**: LUMINA Fashion
**Description**: A modern, minimalistic women's fashion e-commerce website tailored for the Chinese market. The design philosophy draws inspiration from Zara and H&M, emphasizing clean lines, high-quality imagery, and a sophisticated monochromatic palette with subtle accents.
**Target Audience**: Fashion-conscious consumers in China seeking modern, stylish apparel.
**Platform**: Responsive Web Application (Mobile-first design).

## 2. Design & Aesthetics
**Visual Style**:
-   **Color Palette**: Primarily Black (#000000), White (#FFFFFF), and Grey (#333333). Accents in Soft Beige (#F5F5DC) and Deep Navy Blue (#000080).
-   **Typography**: Clean sans-serif fonts (e.g., Inter, Helvetica, Roboto) for readability and modern feel. No serif fonts unless for specific branding elements.
-   **Imagery**: Large, high-resolution product photography. Lifestyle shots preferred over plain studio backgrounds where possible.
-   **Icons**: Consistent, minimalist icon set (e.g., Lucide or Heroicons). **Strictly NO emojis.**
-   **Interactions**: Smooth transitions, subtle hover effects, natural scrolling.
-   **Empty States**: "Coming Soon" (敬请期待) for features not yet implemented.

## 3. Core Features & Pages

### 3.1 Home Page (首页)
-   **Hero Section**: Full-width carousel showcasing seasonal campaigns or featured collections.
-   **New Arrivals**: Grid of latest products.
-   **Best Sellers**: Highlight popular items.
-   **New User Popup**: Modal offering a discount or welcome message for first-time visitors (triggered on first visit).

### 3.2 Authentication (注册/登录)
-   **Login/Register**: Unified or tabbed interface.
-   **Method**: Email and Password.
-   **Validation**: Basic email format check.
-   **User Profile**: Basic profile management.

### 3.3 Product Listing (商品列表页)
-   **Grid Layout**: Responsive grid (2 columns on mobile, 4 on desktop).
-   **Filters**: Category, Size, Price (optional but recommended).
-   **Sorting**: Newest, Price High-Low.

### 3.4 Product Details (商品详情页)
-   **Image Gallery**: Swipeable gallery for mobile, grid/carousel for desktop.
-   **Info**: Title, Price, Description.
-   **Size Selector**: S, M, L, XL, etc.
-   **Reviews**: User ratings and text reviews.
-   **Add to Cart**: Sticky button on mobile.

### 3.5 Shopping Flow (购物流程)
-   **Cart**: View items, update quantities, remove items.
-   **Checkout**:
    -   **Address Input**: Form for shipping details (Name, Phone, Province, City, District, Address).
    -   **Payment**: Mock payment flow. User clicks "Pay", system simulates processing and returns success.
-   **Order Confirmation**: Success message and order summary.

### 3.6 User Account (用户中心)
-   **Order History**: List of past orders with status.
-   **Contact**: Email support link or form.

## 4. Non-Functional Requirements
-   **Performance**: Fast load times, optimized images.
-   **Responsiveness**: Flawless experience on mobile devices (iPhone, Android) and desktop browsers.
-   **Localization**: Content in Simplified Chinese.
-   **Accessibility**: Basic accessibility standards (contrast, alt text).

## 5. Future Scope
-   WeChat/Alipay integration.
-   Real-time inventory management.
-   Social sharing features.
