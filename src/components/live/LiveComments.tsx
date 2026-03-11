import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveComment } from '@/types';

interface LiveCommentsProps {
  comments: LiveComment[];
}

export function LiveComments({ comments }: LiveCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto px-4 py-2 space-y-2 scrollbar-hide"
    >
      <AnimatePresence initial={false}>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2"
          >
            <span className="text-xs text-gray-400 shrink-0">
              {comment.userName}:
            </span>
            <span className="text-sm text-white break-words">
              {comment.content}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
