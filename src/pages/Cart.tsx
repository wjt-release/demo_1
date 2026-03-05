import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/common';
import { CartItem, CartSummary } from '@/components/cart';
import { useCartStore } from '@/stores/cartStore';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-neutral-100">
              <ShoppingBag size={32} className="text-neutral-400" />
            </div>
            <h2 className="text-xl font-medium text-neutral-900 mb-2">
              购物车是空的
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              快去挑选心仪的商品吧
            </p>
            <Link to="/products">
              <Button>
                去购物
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-6">
          购物车
          <span className="text-base font-normal text-neutral-500 ml-2">
            ({totalItems}件商品)
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-neutral-100 p-4 md:p-6">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <CartSummary
              items={items}
              totalPrice={totalPrice}
              totalItems={totalItems}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
