import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button, EmptyState } from '@/components/common';
import { useCartStore } from '@/store/cartStore';

export function Cart() {
  const navigate = useNavigate();
  const { items, getTotal, removeItem, updateQuantity, clearCart } = useCartStore();

  const shippingFee = getTotal() >= 299 ? 0 : 15;
  const total = getTotal() + shippingFee;

  if (items.length === 0) {
    return (
      <Layout>
        <Header />
        <main className="page-container">
          <div className="container mx-auto py-16">
            <EmptyState
              type="cart"
              title="购物车是空的"
              description="快去挑选您心仪的商品吧"
              action={
                <Link to="/products">
                  <Button variant="primary">去购物</Button>
                </Link>
              }
            />
          </div>
        </main>
        <Footer />
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-8">
          <h1 className="font-display text-2xl md:text-3xl font-medium text-primary mb-8">
            购物车
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-100 text-sm text-gray-500">
                  <div className="col-span-6">商品信息</div>
                  <div className="col-span-2 text-center">单价</div>
                  <div className="col-span-2 text-center">数量</div>
                  <div className="col-span-2 text-center">小计</div>
                </div>

                {items.map((item, index) => (
                  <motion.div
                    key={`${item.productId}-${item.size}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center"
                  >
                    <div className="md:col-span-6 flex gap-4">
                      <Link to={`/products/${item.productId}`}>
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-24 h-32 object-cover"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link
                          to={`/products/${item.productId}`}
                          className="font-medium text-primary hover:underline line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">尺码: {item.size}</p>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="flex items-center gap-1 text-sm text-gray-400 hover:text-status-error mt-2 md:hidden"
                        >
                          <Trash2 className="w-4 h-4" />
                          删除
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center">
                      <span className="md:hidden text-sm text-gray-500 mr-2">单价:</span>
                      <span className="font-medium">¥{item.product.price.toFixed(2)}</span>
                    </div>

                    <div className="md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="px-3 py-1 text-gray-500 hover:text-primary"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="px-3 py-1 text-gray-500 hover:text-primary"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between md:justify-center gap-4">
                      <span className="font-medium text-primary">
                        ¥{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="hidden md:block text-gray-400 hover:text-status-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-primary"
                >
                  清空购物车
                </button>
                <Link to="/products" className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" />
                  继续购物
                </Link>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 sticky top-24">
                <h2 className="font-medium text-lg mb-6">订单摘要</h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">商品小计</span>
                    <span>¥{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">运费</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-status-success">免运费</span>
                      ) : (
                        `¥${shippingFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="text-xs text-gray-400">
                      满299元免运费，还差¥{(299 - getTotal()).toFixed(2)}
                    </p>
                  )}
                  <div className="border-t border-gray-100 pt-4 flex justify-between">
                    <span className="font-medium">合计</span>
                    <span className="text-xl font-medium text-primary">
                      ¥{total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  fullWidth
                  className="mt-6"
                  onClick={() => navigate('/checkout')}
                >
                  去结算
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
