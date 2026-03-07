export const getTileColor = (value: number): string => {
  const colors: Record<number, string> = {
    2: 'bg-cyber-cyan/20 border-cyber-cyan shadow-[0_0_10px_rgba(0,243,255,0.3)]',
    4: 'bg-cyber-pink/20 border-cyber-pink shadow-[0_0_10px_rgba(188,19,254,0.3)]',
    8: 'bg-cyber-yellow/20 border-cyber-yellow shadow-[0_0_10px_rgba(249,240,2,0.3)]',
    16: 'bg-blue-500/40 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)]',
    32: 'bg-purple-500/40 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]',
    64: 'bg-red-500/40 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]',
    128: 'bg-yellow-400/50 border-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.5)]',
    256: 'bg-cyan-400/50 border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.5)]',
    512: 'bg-pink-500/50 border-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.5)]',
    1024: 'bg-green-500/50 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)]',
    2048: 'bg-white/60 border-white shadow-[0_0_30px_rgba(255,255,255,0.8)] animate-pulse',
  };

  return colors[value] || 'bg-gray-800/50 border-gray-700';
};

export const getTileTextColor = (value: number): string => {
  return value > 4 ? 'text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]' : 'text-white';
};
