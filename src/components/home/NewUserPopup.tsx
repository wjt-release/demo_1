import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { Button } from '@/components/common';

const NewUserPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenNewUserPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenNewUserPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="relative h-48 bg-gradient-to-br from-neutral-900 to-neutral-700 flex items-center justify-center">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleClose}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <Gift size={32} />
                </div>
                <h3 className="text-2xl font-serif font-semibold">
                  新人专享礼遇
                </h3>
              </div>
            </div>

            <div className="p-6 text-center">
              <p className="text-lg font-medium text-neutral-900 mb-2">
                首单立减 ¥50
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                注册即享新人专属优惠，更有会员积分等你来拿
              </p>

              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={handleClose}>
                  <Button fullWidth>立即注册领取</Button>
                </Link>
                <Button variant="ghost" fullWidth onClick={handleClose}>
                  稍后再说
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewUserPopup;
