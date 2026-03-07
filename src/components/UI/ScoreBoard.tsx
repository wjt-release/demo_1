import React from 'react';

interface ScoreBoardProps {
  score: number;
  bestScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, bestScore }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center justify-center bg-cyber-dark/80 border border-cyber-cyan/50 rounded-lg p-2 min-w-[80px] shadow-neon-cyan">
        <span className="text-xs text-cyber-cyan font-display tracking-widest uppercase">Score</span>
        <span className="text-xl font-bold text-white drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">
          {score}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center bg-cyber-dark/80 border border-cyber-pink/50 rounded-lg p-2 min-w-[80px] shadow-neon-pink">
        <span className="text-xs text-cyber-pink font-display tracking-widest uppercase">Best</span>
        <span className="text-xl font-bold text-white drop-shadow-[0_0_5px_rgba(188,19,254,0.8)]">
          {bestScore}
        </span>
      </div>
    </div>
  );
};
