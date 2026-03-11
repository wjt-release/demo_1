import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { Button } from '@/components/common';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { showCartDrawer, closeCartDrawer } = useUIStore();
  const { items, getTotal, removeItem, updateQuantity } = useCartStore();

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {showCartDrawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={closeCartDrawer}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-medium flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-lg font-medium">购物车</h2>
                <button
                  onClick={closeCartDrawer}
                  className="p-1 text-gray-400 hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-gray-500 mb-4">购物车是空的</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        closeCartDrawer();
                      }}
                    >
                      <Link to="/products">去购物</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={`${item.productId}-${item.size}`}
                        className="flex gap-4 pb-4 border-b border-gray-100"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-primary line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">尺码: {item.size}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border border-gray-200">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.quantity - 1
                                  )
                                }
                                className="px-2 py-1 text-gray-500 hover:text-primary"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-sm">{item.quantity}</span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.size,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 text-gray-500 hover:text-primary"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-sm font-medium">
                              ¥{(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-gray-400 hover:text-status-error text-sm"
                        >
                          删除
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500">小计</span>
                    <span className="text-xl font-medium">¥{getTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => closeCartDrawer()}
                    >
                      <Link to="/cart">查看购物车</Link>
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => closeCartDrawer()}
                    >
                      <Link to="/checkout">去结算</Link>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
