import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProductListPage } from './pages/product/ProductListPage';
import { ProductDetailPage } from './pages/product/ProductDetailPage';
import { CartPage } from './pages/cart/CartPage';
import { CheckoutPage } from './pages/cart/CheckoutPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { OrderHistoryPage } from './pages/order/OrderHistoryPage';
import { ContactPage } from './pages/support/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="orders" element={<OrderHistoryPage />} />
          <Route path="contact" element={<ContactPage />} />
          
          {/* Coming Soon placeholders */}
          <Route path="shipping" element={<div className="container mx-auto px-4 py-20 text-center text-4xl font-bold tracking-tighter uppercase">敬请期待 (Coming Soon)</div>} />
          <Route path="size-guide" element={<div className="container mx-auto px-4 py-20 text-center text-4xl font-bold tracking-tighter uppercase">敬请期待 (Coming Soon)</div>} />
          <Route path="faq" element={<div className="container mx-auto px-4 py-20 text-center text-4xl font-bold tracking-tighter uppercase">敬请期待 (Coming Soon)</div>} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
