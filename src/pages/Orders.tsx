import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Layout } from '@/components/layout';
import { OrderCard } from '@/components/order';
import { EmptyState } from '@/components/common';
import { useAuthStore } from '@/stores/authStore';
import { useOrderStore } from '@/stores/orderStore';

const Orders = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { getOrdersByUserId } = useOrderStore();

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-neutral-500 mb-4">请先登录查看订单</p>
          <Link to="/login" className="text-neutral-900 underline">
            去登录
          </Link>
        </div>
      </Layout>
    );
  }

  const orders = getOrdersByUserId(user!.id);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-serif font-semibold text-neutral-900 mb-6">
          我的订单
        </h1>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <OrderCard order={order} />
              </motion.div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="暂无订单"
            description="您还没有任何订单，快去选购心仪的商品吧"
            icon={<ShoppingBag size={32} />}
            action={
              <Link to="/products">
                <button className="px-6 py-2 bg-neutral-900 text-white text-sm rounded-md hover:bg-neutral-800 transition-colors">
                  去购物
                </button>
              </Link>
            }
          />
        )}
      </div>
    </Layout>
  );
};

export default Orders;
