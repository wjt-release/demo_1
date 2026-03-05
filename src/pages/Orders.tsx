import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { useOrderStore, useAuthStore } from '@/stores';
import { formatPrice, formatDate, formatOrderStatus } from '@/utils/format';

export function Orders() {
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Package size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-xl font-medium mb-2">请先登录</h2>
          <p className="text-gray-500 mb-6">登录后查看您的订单</p>
          <Button onClick={() => navigate('/login', { state: { from: '/orders' } })}>
            去登录
          </Button>
        </div>
      </Layout>
    );
  }

  const userOrders = orders.filter(o => o.userId === user?.id);

  if (userOrders.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <Package size={64} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-xl font-medium mb-2">暂无订单</h2>
          <p className="text-gray-500 mb-6">快去选购心仪的商品吧</p>
          <Button onClick={() => navigate('/products')}>去购物</Button>
        </div>
      </Layout>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'shipped':
        return <Truck size={18} className="text-blue-500" />;
      case 'delivered':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'cancelled':
        return <XCircle size={18} className="text-red-500" />;
      default:
        return <Clock size={18} className="text-yellow-500" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-serif font-bold mb-6">我的订单</h1>

        <div className="space-y-4">
          {userOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/orders/${order.id}`}
                className="block bg-white border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="font-medium">{formatOrderStatus(order.status)}</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
                </div>

                <div className="flex space-x-3 overflow-x-auto">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-20 object-cover rounded flex-shrink-0"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-16 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-sm text-gray-500">+{order.items.length - 3}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{formatPrice(order.totalAmount)}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrderStore();
  const { isAuthenticated } = useAuthStore();

  const order = id ? getOrderById(id) : null;

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!order) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 mb-4">订单不存在</p>
          <Button onClick={() => navigate('/orders')}>返回订单列表</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <ChevronRight size={16} className="rotate-180" />
          返回
        </button>

        <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            {order.status === 'paid' && <CheckCircle size={20} className="text-green-500" />}
            {order.status === 'shipped' && <Truck size={20} className="text-blue-500" />}
            {order.status === 'delivered' && <CheckCircle size={20} className="text-green-500" />}
            {order.status === 'pending' && <Clock size={20} className="text-yellow-500" />}
            {order.status === 'cancelled' && <XCircle size={20} className="text-red-500" />}
            <span className="font-medium">{formatOrderStatus(order.status)}</span>
          </div>
          <p className="text-sm text-gray-500">订单号: {order.id.slice(-8).toUpperCase()}</p>
          <p className="text-sm text-gray-500">下单时间: {formatDate(order.createdAt)}</p>
          {order.paidAt && (
            <p className="text-sm text-gray-500">支付时间: {formatDate(order.paidAt)}</p>
          )}
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-3">收货信息</h3>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.receiver} {order.shippingAddress.phone}
          </p>
          <p className="text-sm text-gray-600">
            {order.shippingAddress.province}
            {order.shippingAddress.city}
            {order.shippingAddress.district}
            {order.shippingAddress.detail}
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-4 mb-6">
          <h3 className="font-medium mb-4">商品信息</h3>
          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div key={index} className="flex space-x-4">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.productName}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    尺码: {item.size} | 数量: {item.quantity}
                  </p>
                  <p className="text-sm font-medium mt-1">{formatPrice(item.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">商品金额</span>
              <span>{formatPrice(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">运费</span>
              <span>免运费</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-100">
              <span className="font-medium">订单金额</span>
              <span className="text-xl font-bold">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
