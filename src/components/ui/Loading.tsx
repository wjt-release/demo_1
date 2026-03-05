import { motion } from 'framer-motion';

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export function Loading({ text = '加载中...', fullScreen = false }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-2 border-black border-t-transparent rounded-full"
      />
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="py-12 flex items-center justify-center">{content}</div>;
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-gray-200 rounded-lg" />
      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}
