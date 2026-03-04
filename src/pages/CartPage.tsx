import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus } from 'lucide-react';

export const CartPage = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wider mb-6">购物车为空</h1>
        <p className="text-gray-500 mb-10">您的购物车里还没有商品，快去选购吧！</p>
        <Link to="/products">
          <Button variant="primary" size="lg" className="px-10">
            浏览商品
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold uppercase tracking-wider mb-10 text-center">购物车</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1 space-y-8">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex flex-col sm:flex-row items-center border-b border-gray-100 pb-8">
              <div className="w-24 h-32 flex-shrink-0 overflow-hidden bg-gray-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
              </div>
              <div className="flex-1 mt-4 sm:mt-0 sm:ml-6 flex flex-col justify-between h-32">
                <div>
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-lg font-medium text-gray-900">¥ {item.price * item.quantity}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">尺码: {item.size}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-300">
                    <button 
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.productId, item.size)}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center transition-colors"
                  >
                    <Trash2 size={16} className="mr-1" /> 删除
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <button 
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-black underline transition-colors"
            >
              清空购物车
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 bg-gray-50 p-8 h-fit">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-6">订单摘要</h2>
          <div className="flex justify-between mb-4 text-sm text-gray-600">
            <span>小计</span>
            <span>¥ {total()}</span>
          </div>
          <div className="flex justify-between mb-4 text-sm text-gray-600">
            <span>运费</span>
            <span>免费</span>
          </div>
          <div className="border-t border-gray-200 pt-4 flex justify-between mb-8 font-bold text-lg">
            <span>总计</span>
            <span>¥ {total()}</span>
          </div>
          <Button 
            onClick={handleCheckout}
            size="lg" 
            className="w-full uppercase tracking-widest py-4"
          >
            去结算
          </Button>
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>支持多种支付方式，安全快捷。</p>
          </div>
        </div>
      </div>
    </div>
  );
};
