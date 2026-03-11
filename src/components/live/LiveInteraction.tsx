import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Users } from 'lucide-react';
import { useLiveStore } from '@/store/liveStore';
import { getRandomComment } from '@/data/liveStreams';
import { LiveComment } from '@/types';

interface FloatingHeart {
  id: number;
  x: number;
}

interface LiveInteractionProps {
  streamId: string;
  viewerCount: number;
}

export function LiveInteraction({ streamId, viewerCount }: LiveInteractionProps) {
  const [commentInput, setCommentInput] = useState('');
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const { addComment, addLike, likes } = useLiveStore();

  const handleSendComment = () => {
    if (!commentInput.trim()) return;
    const comment: LiveComment = {
      id: Date.now().toString(),
      streamId,
      userName: '我',
      content: commentInput.trim(),
      createdAt: new Date(),
    };
    addComment(comment);
    setCommentInput('');
  };

  const handleLike = useCallback(() => {
    addLike();
    const heart: FloatingHeart = {
      id: Date.now(),
      x: Math.random() * 60 + 20,
    };
    setFloatingHearts((prev) => [...prev.slice(-10), heart]);
  }, [addLike]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomComment = getRandomComment();
      addComment(randomComment);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [addComment]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendComment();
      }
    };

    return () => {};
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 py-2 bg-black/30">
        <div className="flex items-center gap-2 text-white text-sm">
          <Users className="w-4 h-4" />
          <span className="animate-pulse">{viewerCount.toLocaleString()}</span>
          <span className="text-gray-400">人观看</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLike}
            className="relative flex items-center gap-1 text-white hover:text-[#FF2D55] transition-colors"
          >
            <Heart className="w-5 h-5 fill-current" />
            <span className="text-xs">{likes > 0 ? likes : ''}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -200, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute pointer-events-none"
            style={{ left: `${heart.x}%`, bottom: '60px' }}
          >
            <Heart className="w-8 h-8 text-[#FF2D55] fill-[#FF2D55]" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex items-center gap-2 px-4 py-3 bg-black/50">
        <input
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendComment();
            }
          }}
          placeholder="说点什么..."
          className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white/40"
        />
        <button
          onClick={handleSendComment}
          disabled={!commentInput.trim()}
          className="p-2 bg-[#FF2D55] rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF2D55]/90 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
