import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { useCartStore, useAuthStore } from '@/stores';
import { formatPrice } from '@/utils/format';

export function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-xl font-medium mb-2">购物车是空的</h2>
          <p className="text-gray-500 mb-6">快去挑选心仪的商品吧</p>
          <Button onClick={() => navigate('/products')}>去购物</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6 pb-32 md:pb-6">
        <h1 className="text-2xl font-serif font-bold mb-6">购物车 ({getTotalItems()})</h1>

        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-100 rounded-lg p-4 flex space-x-4"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-1">{item.product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">尺码: {item.size}</p>
                <p className="font-medium mt-2">{formatPrice(item.product.price)}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-gray-200 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="fixed bottom-20 md:bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:relative md:border-t-0 md:mt-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">商品总计</span>
              <span className="text-xl font-bold">{formatPrice(getTotalPrice())}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full" size="lg">
              去结算
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
