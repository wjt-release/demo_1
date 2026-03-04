import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Popup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem('hasSeenPopup');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenPopup', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white p-8 max-w-md w-full text-center shadow-2xl"
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold mb-4">GET 10% OFF</h2>
            <p className="text-gray-600 mb-6">
              Sign up for our newsletter and receive an exclusive discount on your first order.
            </p>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleClose(); }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                required
              />
              <button 
                type="submit"
                className="w-full bg-black text-white py-3 font-bold tracking-widest hover:bg-gray-800 transition-colors"
              >
                SUBSCRIBE
              </button>
            </form>
            
            <button 
              onClick={handleClose}
              className="mt-4 text-xs text-gray-400 underline hover:text-gray-600"
            >
              No thanks, I prefer paying full price
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
