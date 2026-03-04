import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { useCartStore, useUserStore } from '../stores';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const { isLoggedIn } = useUserStore();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="page-container">
          <div className="container-custom py-20">
            <div className="text-center">
              <ShoppingBag size={64} className="mx-auto text-primary-gray mb-4" />
              <h1 className="font-display text-2xl text-primary-black mb-2">购物车是空的</h1>
              <p className="text-primary-gray mb-8">快去挑选心仪的商品吧</p>
              <Link to="/products">
                <Button>去购物</Button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="container-custom py-8 lg:py-12">
          <h1 className="font-display text-2xl lg:text-3xl text-primary-black mb-8">购物车</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="border-b border-gray-200 pb-4 mb-4 hidden lg:grid grid-cols-12 gap-4 text-sm text-primary-gray">
                <div className="col-span-6">商品信息</div>
                <div className="col-span-2 text-center">单价</div>
                <div className="col-span-2 text-center">数量</div>
                <div className="col-span-2 text-center">小计</div>
              </div>

              <div className="space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 py-6 border-b border-gray-100"
                  >
                    <div className="lg:col-span-6 flex gap-4">
                      <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-24 h-32 object-cover"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.product.id}`}
                          className="text-sm font-medium text-primary-black hover:text-primary-gray line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-primary-gray mt-1">
                          颜色: {item.color} | 尺码: {item.size}
                        </p>
                        <button
                          onClick={() => removeItem(item.product.id, item.size)}
                          className="flex items-center gap-1 text-sm text-primary-gray hover:text-primary-black mt-4 lg:hidden"
                        >
                          <Trash2 size={14} />
                          删除
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-between lg:justify-center">
                      <span className="text-sm text-primary-gray lg:hidden">单价</span>
                      <span className="text-sm text-primary-black">
                        ¥{item.product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-between lg:justify-center">
                      <span className="text-sm text-primary-gray lg:hidden">数量</span>
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background-light"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background-light"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-between lg:justify-center">
                      <span className="text-sm text-primary-gray lg:hidden">小计</span>
                      <span className="text-sm font-medium text-primary-black">
                        ¥{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="hidden lg:block text-primary-gray hover:text-primary-black"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={clearCart}
                  className="text-sm text-primary-gray hover:text-primary-black"
                >
                  清空购物车
                </button>
                <Link to="/products" className="text-sm text-primary-gray hover:text-primary-black">
                  继续购物
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-background-light p-6 sticky top-24">
                <h3 className="font-medium text-primary-black mb-4">订单摘要</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-primary-gray">商品数量</span>
                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)} 件</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-gray">商品金额</span>
                    <span>¥{getTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-gray">运费</span>
                    <span>免运费</span>
                  </div>
                </div>
                <div className="border-t border-gray-300 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">合计</span>
                    <span className="text-xl font-medium">¥{getTotal().toLocaleString()}</span>
                  </div>
                </div>
                <Button fullWidth className="mt-6" onClick={handleCheckout}>
                  去结算
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
