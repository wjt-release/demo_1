import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, MapPin, Phone, CreditCard } from 'lucide-react';
import { Layout } from '../components/layout';
import { Button } from '../components/common';
import { useUserStore, useOrderStore } from '../stores';

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isLoggedIn } = useUserStore();
  const { getOrderById } = useOrderStore();

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

  const order = getOrderById(id || '');

  if (!order) {
    return (
      <Layout>
        <div className="page-container">
          <div className="container-custom py-20 text-center">
            <p className="text-primary-gray mb-4">订单不存在</p>
            <Link to="/orders">
              <Button>返回订单列表</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

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
      pending: 'text-yellow-600 bg-yellow-50',
      paid: 'text-blue-600 bg-blue-50',
      shipped: 'text-purple-600 bg-purple-50',
      delivered: 'text-green-600 bg-green-50',
    };
    return colorMap[status] || 'text-primary-gray bg-gray-50';
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="container-custom py-8 lg:py-12">
          <Link
            to="/orders"
            className="flex items-center gap-2 text-sm text-primary-gray hover:text-primary-black mb-8"
          >
            <ArrowLeft size={16} />
            返回订单列表
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-display text-2xl text-primary-black">订单详情</h1>
                <p className="text-sm text-primary-gray mt-1">订单号: {order.id}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="border border-gray-200">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-medium flex items-center gap-2">
                      <Package size={18} />
                      商品信息
                    </h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {order.items.map(item => (
                      <div key={`${item.product.id}-${item.size}`} className="p-4 flex gap-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-primary-gray mt-1">
                            {item.color} / {item.size}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-primary-gray">x{item.quantity}</span>
                            <span className="text-sm">¥{(item.product.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-medium flex items-center gap-2">
                      <MapPin size={18} />
                      收货信息
                    </h3>
                  </div>
                  <div className="p-4 space-y-2 text-sm">
                    <p>
                      <span className="text-primary-gray">收货人：</span>
                      {order.shippingAddress.name}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={14} className="text-primary-gray" />
                      {order.shippingAddress.phone}
                    </p>
                    <p>
                      {order.shippingAddress.province}
                      {order.shippingAddress.city}
                      {order.shippingAddress.district}
                      {order.shippingAddress.detail}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="border border-gray-200 p-6 sticky top-24">
                  <h3 className="font-medium mb-4">订单信息</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary-gray">下单时间</span>
                      <span>{new Date(order.createdAt).toLocaleString('zh-CN')}</span>
                    </div>
                    {order.paidAt && (
                      <div className="flex justify-between">
                        <span className="text-primary-gray">付款时间</span>
                        <span>{new Date(order.paidAt).toLocaleString('zh-CN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-primary-gray">支付方式</span>
                      <span>在线支付</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-gray">商品数量</span>
                      <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} 件</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-gray">商品金额</span>
                      <span>¥{order.totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary-gray">运费</span>
                      <span>免运费</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">订单总额</span>
                      <span className="text-xl font-medium">¥{order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
