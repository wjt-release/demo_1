import React from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

interface GameWonProps {
  onContinue: () => void;
  onRestart: () => void;
}

export const GameWon: React.FC<GameWonProps> = ({ onContinue, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl p-6 text-center border border-cyber-cyan/30"
    >
      <h2 className="text-4xl font-display font-bold text-cyber-cyan mb-4 drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]">
        SYSTEM HACKED
      </h2>
      <p className="text-gray-300 mb-8 font-body">2048 Access Granted.</p>
      <div className="flex gap-4">
        <button
          onClick={onContinue}
          className="px-6 py-3 bg-cyber-cyan/20 border border-cyber-cyan text-cyber-cyan rounded-lg hover:bg-cyber-cyan hover:text-black transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.3)]"
        >
          <Play size={20} />
          CONTINUE
        </button>
        <button
          onClick={onRestart}
          className="px-6 py-3 bg-transparent border border-gray-500 text-gray-400 rounded-lg hover:border-white hover:text-white transition-all duration-300 flex items-center gap-2"
        >
          <RotateCcw size={20} />
          RESET
        </button>
      </div>
    </motion.div>
  );
};
