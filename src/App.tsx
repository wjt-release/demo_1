import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Payment from "@/pages/Payment";
import Orders from "@/pages/Orders";
import OrderDetail from "@/pages/OrderDetail";
import Contact from "@/pages/Contact";
import ComingSoon from "@/pages/ComingSoon";
import NotFound from "@/pages/NotFound";

export default function App() {
  useTheme();

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
