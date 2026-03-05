import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  Products,
  ProductDetail,
  Cart,
  Checkout,
  Payment,
  Orders,
  OrderDetail,
  Account,
  Contact,
  Favorites,
  Coupons,
  FlashSale,
  Live,
  NotFound,
} from '@/pages';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/flash-sale" element={<FlashSale />} />
        <Route path="/live" element={<Live />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
