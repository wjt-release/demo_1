import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package } from 'lucide-react';
import { Header, Footer, Layout } from '@/components/layout';
import { Button } from '@/components/common';
import { useOrderStore } from '@/store/orderStore';
import { useAuthStore } from '@/store/authStore';

export function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStatus } = useOrderStore();
  const { isAuthenticated } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const orderId = searchParams.get('id');
  const order = orderId ? getOrderById(orderId) : null;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!order) {
      navigate('/');
      return;
    }

    const timer = setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      if (order && order.status === 'pending') {
        updateOrderStatus(order.id, 'paid');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [order, isAuthenticated, navigate, updateOrderStatus]);

  if (!isAuthenticated || !order) {
    return null;
  }

  return (
    <Layout>
      <Header />
      <main className="page-container bg-secondary-light min-h-screen">
        <div className="container mx-auto py-16">
          <div className="max-w-md mx-auto text-center">
            {isProcessing ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <h1 className="text-2xl font-medium text-primary">正在处理支付...</h1>
                <p className="text-gray-500">请稍候，正在为您处理订单</p>
              </motion.div>
            ) : isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="w-20 h-20 mx-auto bg-status-success rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-2xl font-medium text-primary">支付成功</h1>
                <p className="text-gray-500">感谢您的购买，订单已确认</p>
                
                <div className="bg-white p-6 mt-8 text-left">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500">订单编号</span>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500">支付金额</span>
                    <span className="text-xl font-medium text-primary">
                      ¥{order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">订单状态</span>
                    <span className="text-status-success">已支付</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Link to="/orders" className="flex-1">
                    <Button variant="outline" fullWidth>
                      <Package className="w-4 h-4 mr-2" />
                      查看订单
                    </Button>
                  </Link>
                  <Link to="/products" className="flex-1">
                    <Button variant="primary" fullWidth>
                      继续购物
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
