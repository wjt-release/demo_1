import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useUserStore } from '../store/useStore';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';

export const Checkout = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { addOrder, user } = useUserStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    country: 'China',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock payment processing
    setTimeout(() => {
      const order = {
        id: `ord-${Date.now()}`,
        items: [...items],
        total: getTotal() + 20,
        date: new Date().toISOString(),
        status: 'Paid',
        shippingAddress: formData
      };

      addOrder(order);
      clearCart();
      setIsProcessing(false);
      navigate('/profile'); // Redirect to order history
    }, 2000);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
      
      {/* Checkout Form */}
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 mb-8">Shipping Address</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <Input 
              label="Full Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Email Address" 
              name="email" 
              type="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
              className="sm:col-span-2" 
            />
            <Input 
              label="City" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Postal Code" 
              name="zip" 
              value={formData.zip} 
              onChange={handleChange} 
              required 
            />
            <Input 
              label="Country" 
              name="country" 
              value={formData.country} 
              disabled 
            />
          </div>

          <div className="mt-10 border-t border-zinc-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wide mb-4">Payment Method</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input id="credit-card" name="payment-type" type="radio" defaultChecked className="h-4 w-4 border-gray-300 text-black focus:ring-black" />
                <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">Credit Card</label>
              </div>
              <div className="flex items-center">
                <input id="alipay" name="payment-type" type="radio" className="h-4 w-4 border-gray-300 text-black focus:ring-black" />
                <label htmlFor="alipay" className="ml-3 block text-sm font-medium text-gray-700">Alipay</label>
              </div>
              <div className="flex items-center">
                <input id="wechat" name="payment-type" type="radio" className="h-4 w-4 border-gray-300 text-black focus:ring-black" />
                <label htmlFor="wechat" className="ml-3 block text-sm font-medium text-gray-700">WeChat Pay</label>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isProcessing} 
            className="w-full mt-8"
          >
            {isProcessing ? 'Processing...' : `Pay CNY ${getTotal() + 20}`}
          </Button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-zinc-50 p-8 rounded-lg h-fit">
        <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wide mb-6">Order Summary</h2>
        <ul className="divide-y divide-zinc-200">
          {items.map((item) => (
            <li key={item.cartId} className="py-4 flex space-x-4">
              <img src={item.image} alt={item.name} className="flex-none w-16 h-16 object-cover rounded-md bg-zinc-100" />
              <div className="flex-auto space-y-1">
                <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.color} / {item.size}</p>
                <p className="text-sm font-medium text-gray-900">Qty {item.quantity}</p>
              </div>
              <p className="flex-none text-sm font-medium text-gray-900">CNY {item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="border-t border-zinc-200 pt-6 mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="font-medium text-gray-900">CNY {getTotal()}</dd>
          </div>
          <div className="flex items-center justify-between text-sm">
            <dt className="text-gray-600">Shipping</dt>
            <dd className="font-medium text-gray-900">CNY 20.00</dd>
          </div>
          <div className="flex items-center justify-between border-t border-zinc-200 pt-4 text-base font-medium">
            <dt className="text-gray-900 uppercase tracking-wide">Total</dt>
            <dd className="text-gray-900">CNY {getTotal() + 20}</dd>
          </div>
        </div>
      </div>
    </div>
  );
};
