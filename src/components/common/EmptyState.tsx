import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyState = ({
  title = '敬请期待',
  description = '该功能正在开发中，请稍后再来',
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
        {icon || <PackageOpen size={32} strokeWidth={1.5} />}
      </div>
      <h3 className="text-lg font-medium text-neutral-900 mb-2">{title}</h3>
      <p className="text-sm text-neutral-500 text-center max-w-sm mb-6">
        {description}
      </p>
      {action && <div className="mt-2">{action}</div>}
    </motion.div>
  );
};

export default EmptyState;
