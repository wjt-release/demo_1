import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { useUserStore, useOrderStore } from '../stores';

export const Orders: React.FC = () => {
  const { user, isLoggedIn } = useUserStore();
  const { getOrdersByUser } = useOrderStore();

  if (!isLoggedIn || !user) {
    return (
      <Layout>
        <div className="page-container">
          <div className="container-custom py-20 text-center">
            <p className="text-primary-gray mb-4">请先登录查看订单</p>
            <Link to="/login">
              <Button>去登录</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const orders = getOrdersByUser(user.id);

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: '待付款',
      paid: '已付款',
      shipped: '已发货',
      delivered: '已完成',
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'text-yellow-600',
      paid: 'text-blue-600',
      shipped: 'text-purple-600',
      delivered: 'text-green-600',
    };
    return colorMap[status] || 'text-primary-gray';
  };

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="page-container">
          <div className="container-custom py-20">
            <div className="text-center">
              <Package size={64} className="mx-auto text-primary-gray mb-4" />
              <h1 className="font-display text-2xl text-primary-black mb-2">暂无订单</h1>
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
          <h1 className="font-display text-2xl lg:text-3xl text-primary-black mb-8">我的订单</h1>

          <div className="space-y-4">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-primary-gray">
                      {new Date(order.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                    <span className="text-primary-gray">订单号: {order.id}</span>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="p-4">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {order.items.map(item => (
                      <img
                        key={`${item.product.id}-${item.size}`}
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <span className="text-sm text-primary-gray">
                        共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品
                      </span>
                      <span className="text-sm font-medium ml-4">
                        实付: ¥{order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center text-sm text-primary-gray hover:text-primary-black"
                    >
                      查看详情
                      <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
