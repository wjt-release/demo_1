import { motion } from 'framer-motion';
import { Check, Package, Truck, Home } from 'lucide-react';
import type { OrderStatus } from '@/types';

interface OrderStatusTrackerProps {
  status: OrderStatus;
  createdAt: string;
}

const statusSteps = [
  { key: 'pending', label: '待付款', icon: Check },
  { key: 'paid', label: '已付款', icon: Package },
  { key: 'shipped', label: '已发货', icon: Truck },
  { key: 'delivered', label: '已完成', icon: Home },
];

const OrderStatusTracker = ({ status }: OrderStatusTrackerProps) => {
  const currentStepIndex = statusSteps.findIndex((step) => step.key === status);

  return (
    <div className="py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-neutral-200" />
        
        {statusSteps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <motion.div
              key={step.key}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-center z-10"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-colors ${
                  isCompleted
                    ? 'bg-neutral-900 border-neutral-900 text-white'
                    : 'bg-white border-neutral-200 text-neutral-300'
                } ${isCurrent ? 'ring-4 ring-neutral-100' : ''}`}
              >
                <Icon size={18} />
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCompleted ? 'text-neutral-900' : 'text-neutral-400'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTracker;
