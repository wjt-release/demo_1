import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Eye } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button, EmptyState } from '@/components/common';
import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';
import { OrderStatus } from '@/types';

const statusMap: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: '待支付', color: 'text-status-warning bg-status-warning/10' },
  paid: { label: '已支付', color: 'text-status-success bg-status-success/10' },
  shipped: { label: '已发货', color: 'text-accent-blue bg-accent-blue/10' },
  delivered: { label: '已送达', color: 'text-primary bg-gray-100' },
  cancelled: { label: '已取消', color: 'text-gray-500 bg-gray-100' },
};

export function Orders() {
  const { orders } = useOrderStore();
  const { isAuthenticated, user } = useAuthStore();

  const userOrders = orders.filter(o => o.userId === user?.id);

  if (!isAuthenticated) {
    return (
      <Layout>
        <Header />
        <main className="page-container flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">请先登录</h1>
            <Link to="/login">
              <Button variant="primary">去登录</Button>
            </Link>
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
            我的订单
          </h1>

          {userOrders.length === 0 ? (
            <EmptyState
              type="orders"
              title="暂无订单"
              description="快去挑选您心仪的商品吧"
              action={
                <Link to="/products">
                  <Button variant="primary">去购物</Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {userOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">
                        订单编号: {order.id}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    <span className={`text-sm px-2 py-1 ${statusMap[order.status].color}`}>
                      {statusMap[order.status].label}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex gap-4 overflow-x-auto hide-scrollbar">
                      {order.items.map((item) => (
                        <div
                          key={`${item.productId}-${item.size}`}
                          className="flex-shrink-0 flex gap-3"
                        >
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-20 object-cover"
                          />
                          <div className="text-sm">
                            <p className="font-medium line-clamp-1 max-w-32">
                              {item.product.name}
                            </p>
                            <p className="text-gray-500">尺码: {item.size}</p>
                            <p className="text-gray-500">x{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div>
                        <span className="text-gray-500 text-sm">共 {order.items.length} 件商品</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="text-gray-500 text-sm">实付: </span>
                        <span className="text-lg font-medium text-primary">
                          ¥{order.total.toFixed(2)}
                        </span>
                      </div>
                      <Link to={`/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          查看详情
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
