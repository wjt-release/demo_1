import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  Products,
  ProductDetail,
  Cart,
  Checkout,
  Payment,
  Orders,
  OrderDetail,
  Contact,
  ComingSoon,
} from '@/pages';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<ComingSoon />} />
        <Route path="/profile" element={<ComingSoon />} />
        <Route path="/faq" element={<ComingSoon />} />
        <Route path="/shipping" element={<ComingSoon />} />
        <Route path="/returns" element={<ComingSoon />} />
        <Route path="/privacy" element={<ComingSoon />} />
        <Route path="/terms" element={<ComingSoon />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </Router>
  );
}
