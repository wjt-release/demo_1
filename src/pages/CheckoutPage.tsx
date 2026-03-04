import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const CheckoutPage = () => {
  const { items, total, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Mock payment delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order (mock)
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      items,
      total: total(),
      address,
      date: new Date().toISOString(),
      status: '已付款',
    };

    // Store order in local storage (mock backend)
    const existingOrders = JSON.parse(localStorage.getItem('aura-orders') || '[]');
    localStorage.setItem('aura-orders', JSON.stringify([order, ...existingOrders]));

    clearCart();
    setIsProcessing(false);
    navigate('/order-history');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold uppercase tracking-wider mb-10 text-center">结算</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-4">收货地址</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="收货人姓名" 
              name="name" 
              value={address.name} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="联系电话" 
              name="phone" 
              value={address.phone} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <Input 
            label="详细地址" 
            name="street" 
            value={address.street} 
            onChange={handleInputChange} 
            required 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="城市" 
              name="city" 
              value={address.city} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="邮政编码" 
              name="zip" 
              value={address.zip} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="border-t border-gray-100 pt-8 mt-8">
            <h2 className="text-xl font-bold uppercase tracking-wider mb-4">支付方式</h2>
            <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-500">
              <p>本次支付为模拟支付，点击"确认支付"后将直接完成订单。</p>
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            className="w-full uppercase tracking-widest py-4 mt-8"
            isLoading={isProcessing}
          >
            确认支付 ¥ {total()}
          </Button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 p-8 h-fit sticky top-24">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-6">订单详情</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity} ({item.size})</span>
                <span>¥ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
            <span>总计</span>
            <span>¥ {total()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
