import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, MapPin, Phone } from 'lucide-react';
import { Layout } from '@/components/layout';
import { OrderStatusTracker } from '@/components/order';
import { useAuthStore } from '@/stores/authStore';
import { useOrderStore } from '@/stores/orderStore';

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuthStore();
  const { getOrderById } = useOrderStore();

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

  const order = id ? getOrderById(id) : null;

  if (!order || order.userId !== user!.id) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-neutral-500 mb-4">订单不存在</p>
          <Link to="/orders" className="text-neutral-900 underline">
            返回订单列表
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/orders"
          className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-neutral-900 mb-6"
        >
          <ChevronLeft size={16} />
          返回订单列表
        </Link>

        <div className="bg-white rounded-lg border border-neutral-100 overflow-hidden">
          <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">订单号</p>
                <p className="text-base font-medium text-neutral-900">{order.id}</p>
              </div>
              <p className="text-sm text-neutral-500">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          <div className="p-6">
            <OrderStatusTracker status={order.status} createdAt={order.createdAt} />

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <h3 className="text-sm font-medium text-neutral-900 mb-4">收货信息</h3>
              <div className="flex items-start gap-3 text-sm text-neutral-600">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">
                    {order.shippingAddress.receiver}
                    <span className="ml-2 font-normal text-neutral-600">
                      {order.shippingAddress.phone}
                    </span>
                  </p>
                  <p className="mt-1">
                    {order.shippingAddress.province}
                    {order.shippingAddress.city}
                    {order.shippingAddress.district}
                    {order.shippingAddress.detail}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <h3 className="text-sm font-medium text-neutral-900 mb-4">商品清单</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex gap-4"
                  >
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">
                        {item.productName}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {item.color} / {item.size}
                      </p>
                      <p className="text-xs text-neutral-500">数量: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-neutral-900">
                      ¥{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-600">商品小计</span>
                <span className="text-neutral-900">
                  ¥{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-600">运费</span>
                <span className="text-neutral-900">
                  {order.totalAmount >= 299 ? '免运费' : '¥15'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-100">
                <span className="font-medium text-neutral-900">订单总额</span>
                <span className="text-lg font-semibold text-neutral-900">
                  ¥{order.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
