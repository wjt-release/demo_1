import React, { useEffect, useState } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { useEvent } from './hooks/useEvent';
import { Grid } from './components/Board/Grid';
import { Header } from './components/UI/Header';
import { ScoreBoard } from './components/UI/ScoreBoard';
import { GameOver } from './components/Overlays/GameOver';
import { GameWon } from './components/Overlays/GameWon';

function App() {
  const { grid, score, bestScore, status, move, reset, continueGame } = useGameLogic();
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (status === 'game-over') return;
    
    // Prevent default scrolling for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      case 'ArrowUp':
        move('up');
        break;
      case 'ArrowDown':
        move('down');
        break;
      case 'ArrowLeft':
        move('left');
        break;
      case 'ArrowRight':
        move('right');
        break;
    }
  };

  useEvent('keydown', handleKeyDown);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - touchStart.x;
    const deltaY = touchEndY - touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > 30) {
        move(deltaX > 0 ? 'right' : 'left');
      }
    } else {
      if (Math.abs(deltaY) > 30) {
        move(deltaY > 0 ? 'down' : 'up');
      }
    }

    setTouchStart(null);
  };

  return (
    <div 
      className="min-h-screen bg-cyber-dark text-white flex flex-col items-center justify-center p-4 overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,243,255,0.05),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyber-pink/5 blur-[100px] rounded-full"></div>
        <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-cyber-cyan/5 blur-[80px] rounded-full"></div>
      </div>

      <div className="z-10 w-full max-w-[400px] flex flex-col items-center gap-6">
        <div className="w-full flex justify-between items-end">
          <Header onReset={reset} />
          <ScoreBoard score={score} bestScore={bestScore} />
        </div>

        <div className="relative w-full aspect-square">
          <Grid grid={grid} />
          
          {status === 'game-over' && (
            <GameOver onRestart={reset} />
          )}
          
          {status === 'won' && (
            <GameWon onContinue={continueGame} onRestart={reset} />
          )}
        </div>

        <div className="text-gray-500 text-sm font-display tracking-widest mt-8">
          USE ARROW KEYS OR SWIPE
        </div>
      </div>
    </div>
  );
}

export default App;
