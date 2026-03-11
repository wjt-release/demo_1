import { motion } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { Modal, Button } from '@/components/common';
import { Link } from 'react-router-dom';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={false} size="md">
      <div className="relative text-center">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 p-2 text-gray-400 hover:text-primary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="w-16 h-16 bg-accent-beige rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Gift className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl font-medium text-primary mb-4"
        >
          欢迎来到 ÉLÉGANCE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mb-6"
        >
          新用户注册即享 <span className="text-primary font-medium">首单9折</span> 优惠
          <br />
          探索本季最新时尚单品
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3"
        >
          <Link to="/register" onClick={onClose}>
            <Button variant="primary" fullWidth>
              立即注册
            </Button>
          </Link>
          <Button variant="outline" fullWidth onClick={onClose}>
            先逛逛
          </Button>
        </motion.div>
      </div>
    </Modal>
  );
}
