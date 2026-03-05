import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore, useCartStore, useOrderStore } from '@/stores';
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
} from '@/pages';

function AppRoutes() {
  const initAuth = useAuthStore(state => state.initAuth);
  const initCart = useCartStore(state => state.initCart);
  const initOrders = useOrderStore(state => state.initOrders);

  useEffect(() => {
    initAuth();
    initCart();
    initOrders();
  }, [initAuth, initCart, initOrders]);

  return (
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
    </Routes>
  );
}

export function Router() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
