import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Phone } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button } from '@/components/common';
import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';
import { OrderStatus } from '@/types';

const statusMap: Record<OrderStatus, { label: string; color: string; description: string }> = {
  pending: { label: '待支付', color: 'text-status-warning', description: '订单待支付' },
  paid: { label: '已支付', color: 'text-status-success', description: '订单已支付，等待发货' },
  shipped: { label: '已发货', color: 'text-accent-blue', description: '商品已发出，正在配送中' },
  delivered: { label: '已送达', color: 'text-primary', description: '商品已送达' },
  cancelled: { label: '已取消', color: 'text-gray-500', description: '订单已取消' },
};

const statusSteps: OrderStatus[] = ['paid', 'shipped', 'delivered'];

export function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrderStore();
  const { isAuthenticated } = useAuthStore();

  const order = id ? getOrderById(id) : null;

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

  if (!order) {
    return (
      <Layout>
        <Header />
        <main className="page-container flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">订单不存在</h1>
            <Link to="/orders">
              <Button variant="primary">返回订单列表</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </Layout>
    );
  }

  const currentStatusIndex = statusSteps.indexOf(order.status);

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-8">
          <Link
            to="/orders"
            className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            返回订单列表
          </Link>

          <h1 className="font-display text-2xl md:text-3xl font-medium text-primary mb-8">
            订单详情
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className={`text-lg font-medium ${statusMap[order.status].color}`}>
                      {statusMap[order.status].label}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {statusMap[order.status].description}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">订单编号: {order.id}</span>
                </div>

                {order.status !== 'pending' && order.status !== 'cancelled' && (
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, index) => (
                      <div key={step} className="flex items-center">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index <= currentStatusIndex
                                ? 'bg-primary text-white'
                                : 'bg-gray-200 text-gray-400'
                            }`}
                          >
                            {index + 1}
                          </div>
                          <span className="text-xs mt-2">{statusMap[step].label}</span>
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`w-20 h-0.5 mx-2 ${
                              index < currentStatusIndex ? 'bg-primary' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white p-6">
                <h2 className="font-medium mb-4">商品信息</h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-primary line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">尺码: {item.size}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-gray-500">x{item.quantity}</span>
                          <span className="font-medium">
                            ¥{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 sticky top-24">
                <h2 className="font-medium mb-4">收货信息</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium">{order.address.name}</p>
                      <p className="text-gray-500">
                        {order.address.province} {order.address.city} {order.address.district} {order.address.detail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.address.phone}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-6 pt-6">
                  <h2 className="font-medium mb-4">订单信息</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">下单时间</span>
                      <span>{new Date(order.createdAt).toLocaleString('zh-CN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">商品小计</span>
                      <span>¥{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">运费</span>
                      <span>¥0.00</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-100">
                      <span className="font-medium">订单总额</span>
                      <span className="text-xl font-medium text-primary">
                        ¥{order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
