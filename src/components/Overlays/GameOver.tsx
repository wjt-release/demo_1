import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface GameOverProps {
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl p-6 text-center"
    >
      <h2 className="text-4xl font-display font-bold text-cyber-pink mb-4 drop-shadow-[0_0_10px_rgba(188,19,254,0.8)]">
        SYSTEM FAILURE
      </h2>
      <p className="text-gray-300 mb-8 font-body">No valid moves remaining.</p>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-cyber-pink/20 border border-cyber-pink text-cyber-pink rounded-lg hover:bg-cyber-pink hover:text-black transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(188,19,254,0.3)] hover:shadow-[0_0_25px_rgba(188,19,254,0.6)]"
      >
        <RotateCcw size={20} />
        REBOOT SYSTEM
      </button>
    </motion.div>
  );
};
