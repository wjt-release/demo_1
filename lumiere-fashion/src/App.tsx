import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  Products,
  ProductDetail,
  Cart,
  Checkout,
  Orders,
  OrderDetail,
  Contact,
  ComingSoon,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
