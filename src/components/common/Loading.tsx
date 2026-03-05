import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const Loading = ({ size = 'md', text, fullScreen = false }: LoadingProps) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        className={clsx(
          'border-2 border-neutral-200 border-t-neutral-900 rounded-full',
          sizes[size]
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      {text && (
        <p className="text-sm text-neutral-600 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;
