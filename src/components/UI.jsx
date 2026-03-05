import React from 'react';
import useStore from '../store';

const UI = () => {
  const { isNight, toggleNight, showContours, toggleContours } = useStore();

  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl pointer-events-auto z-50">
      <button 
        onClick={toggleNight}
        className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
          isNight 
            ? 'bg-indigo-500/80 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
            : 'bg-amber-400/80 text-amber-900 shadow-[0_0_15px_rgba(251,191,36,0.5)]'
        }`}
      >
        {isNight ? 'Night Mode 🌙' : 'Day Mode ☀️'}
      </button>
      
      <button 
        onClick={toggleContours}
        className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
          showContours 
            ? 'bg-emerald-500/80 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]' 
            : 'bg-white/20 text-white hover:bg-white/30'
        }`}
      >
        Contours {showContours ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

export default UI;
