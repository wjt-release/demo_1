import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui';
import { useOrderStore } from '@/stores';
import { formatPrice } from '@/utils/format';

export function Payment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStatus } = useOrderStore();
  
  const [isProcessing, setIsProcessing] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const orderId = searchParams.get('orderId');
  const order = orderId ? getOrderById(orderId) : null;

  useEffect(() => {
    if (!order) {
      navigate('/orders');
      return;
    }

    const timer = setTimeout(() => {
      updateOrderStatus(orderId!, 'paid');
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [order, orderId, navigate, updateOrderStatus]);

  if (!order) {
    return null;
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md w-full">
          {isProcessing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-6" />
              <h2 className="text-xl font-medium mb-2">正在处理支付</h2>
              <p className="text-gray-500">请稍候...</p>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />
              </motion.div>
              <h2 className="text-2xl font-medium mb-2">支付成功</h2>
              <p className="text-gray-500 mb-2">订单号: {order.id.slice(-8).toUpperCase()}</p>
              <p className="text-2xl font-bold mb-8">{formatPrice(order.totalAmount)}</p>
              <div className="space-y-3">
                <Button onClick={() => navigate(`/orders/${order.id}`)} className="w-full">
                  查看订单
                </Button>
                <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                  继续购物
                </Button>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
