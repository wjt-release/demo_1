import React from 'react';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-[400px] mb-6">
      <h1 className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-cyber-pink animate-glitch drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
        2048
      </h1>
      <button
        onClick={onReset}
        className="p-3 bg-cyber-glass border border-cyber-cyan text-cyber-cyan rounded-lg hover:bg-cyber-cyan hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,243,255,0.2)] active:scale-95 group"
        aria-label="Restart Game"
      >
        <RefreshCw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
      </button>
    </div>
  );
};
