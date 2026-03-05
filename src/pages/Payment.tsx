import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/common';
import { useOrderStore } from '@/stores/orderStore';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('orderId');
  const { getOrderById, updateOrderStatus } = useOrderStore();

  const [status, setStatus] = useState<'pending' | 'processing' | 'success'>('pending');

  const order = orderId ? getOrderById(orderId) : null;

  useEffect(() => {
    if (!order) {
      navigate('/orders');
    }
  }, [order, navigate]);

  const handlePayment = async () => {
    setStatus('processing');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (orderId) {
      updateOrderStatus(orderId, 'paid');
    }

    setStatus('success');
  };

  if (!order) return null;

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md text-center"
        >
          {status === 'pending' && (
            <>
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-neutral-100">
                <span className="text-3xl">💳</span>
              </div>
              <h1 className="text-2xl font-serif font-semibold text-neutral-900 mb-2">
                订单确认
              </h1>
              <p className="text-sm text-neutral-500 mb-6">
                订单号: {order.id}
              </p>

              <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-neutral-600">商品数量</span>
                  <span className="text-neutral-900">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold">
                  <span className="text-neutral-900">应付金额</span>
                  <span className="text-neutral-900">¥{order.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <Button onClick={handlePayment} fullWidth size="lg">
                确认支付
              </Button>

              <p className="text-xs text-neutral-400 mt-4">
                点击确认支付即表示您同意我们的服务条款
              </p>
            </>
          )}

          {status === 'processing' && (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
              >
                <Loader2 size={48} className="text-neutral-900" />
              </motion.div>
              <h1 className="text-2xl font-serif font-semibold text-neutral-900 mb-2">
                支付处理中
              </h1>
              <p className="text-sm text-neutral-500">
                请稍候，正在处理您的支付...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-green-500"
              >
                <Check size={40} className="text-white" />
              </motion.div>
              <h1 className="text-2xl font-serif font-semibold text-neutral-900 mb-2">
                支付成功
              </h1>
              <p className="text-sm text-neutral-500 mb-6">
                感谢您的购买，我们会尽快为您发货
              </p>

              <div className="space-y-3">
                <Button onClick={() => navigate(`/orders/${order.id}`)} fullWidth>
                  查看订单
                </Button>
                <Button variant="outline" onClick={() => navigate('/')} fullWidth>
                  继续购物
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default Payment;
