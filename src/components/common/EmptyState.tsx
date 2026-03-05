import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, Ticket, Clock, Video } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  type?: 'cart' | 'orders' | 'favorites' | 'coupons' | 'flash-sale' | 'live' | 'default';
}

const iconMap = {
  cart: <Package className="w-16 h-16" />,
  orders: <Package className="w-16 h-16" />,
  favorites: <Heart className="w-16 h-16" />,
  coupons: <Ticket className="w-16 h-16" />,
  'flash-sale': <Clock className="w-16 h-16" />,
  live: <Video className="w-16 h-16" />,
  default: <Package className="w-16 h-16" />,
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  type = 'default',
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="text-gray-300 mb-6">
        {icon || iconMap[type]}
      </div>
      <h3 className="text-xl font-medium text-primary mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 mb-6 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </motion.div>
  );
}
