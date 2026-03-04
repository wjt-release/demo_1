import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, clearCart, addOrder } = useStore();
  const [loading, setLoading] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 20;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock Payment
    setTimeout(() => {
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        total,
        status: 'Processing' as const,
        items: [...cart]
      };
      
      addOrder(order);
      clearCart();
      setLoading(false);
      alert('Payment Successful! Order placed.');
      navigate('/'); // Redirect to home or order history
    }, 2000);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-2xl font-bold mb-8 text-center">CHECKOUT</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shipping Form */}
        <div>
          <h3 className="text-lg font-bold mb-6">SHIPPING ADDRESS</h3>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" required className="border p-3 w-full focus:outline-none focus:border-black" />
              <input type="text" placeholder="Last Name" required className="border p-3 w-full focus:outline-none focus:border-black" />
            </div>
            <input type="text" placeholder="Address" required className="border p-3 w-full focus:outline-none focus:border-black" />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" required className="border p-3 w-full focus:outline-none focus:border-black" />
              <input type="text" placeholder="Postal Code" required className="border p-3 w-full focus:outline-none focus:border-black" />
            </div>
            <input type="tel" placeholder="Phone" required className="border p-3 w-full focus:outline-none focus:border-black" />
          </form>
        </div>

        {/* Order Summary & Payment */}
        <div className="bg-gray-50 p-8 h-fit">
          <h3 className="text-lg font-bold mb-6">YOUR ORDER</h3>
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="flex justify-between text-sm">
                <span>{item.product.name} (x{item.quantity})</span>
                <span>¥{item.product.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>¥{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `¥${shipping}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4">
              <span>Total</span>
              <span>¥{total}</span>
            </div>
          </div>

          <button 
            type="submit" 
            form="checkout-form"
            disabled={loading}
            className="w-full bg-black text-white py-4 mt-8 text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'PROCESSING...' : 'PAY NOW'}
          </button>
        </div>
      </div>
    </div>
  );
};
