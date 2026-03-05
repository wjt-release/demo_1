import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Package } from 'lucide-react';
import type { Order, OrderStatus as OrderStatusType } from '@/types';

const statusConfig: Record<OrderStatusType, { label: string; color: string; bgColor: string }> = {
  pending: { label: '待付款', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  paid: { label: '已付款', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  shipped: { label: '已发货', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  delivered: { label: '已完成', color: 'text-green-600', bgColor: 'bg-green-50' },
};

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const status = statusConfig[order.status];
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-neutral-100 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 border-b border-neutral-100">
        <div className="flex items-center gap-4">
          <span className="text-xs text-neutral-500">
            订单号: {order.id}
          </span>
          <span className="text-xs text-neutral-500">
            {formatDate(order.createdAt)}
          </span>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded ${status.bgColor} ${status.color}`}>
          {status.label}
        </span>
      </div>

      <div className="p-4">
        <div className="flex gap-3">
          {order.items.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="w-16 h-20 bg-neutral-100 rounded-md overflow-hidden flex-shrink-0"
            >
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="w-16 h-20 bg-neutral-100 rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-neutral-500">
                +{order.items.length - 3}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm text-neutral-600">
              共 {order.items.reduce((sum, item) => sum + item.quantity, 0)} 件商品
            </p>
            <p className="text-base font-semibold text-neutral-900 mt-1">
              ¥{order.totalAmount.toLocaleString()}
            </p>
          </div>

          <Link
            to={`/orders/${order.id}`}
            className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 border border-neutral-200 rounded-md hover:border-neutral-300 transition-colors"
          >
            查看详情
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderCard;
