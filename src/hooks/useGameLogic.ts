import { useReducer, useEffect, useCallback } from 'react';
import {
  Grid,
  createEmptyGrid,
  addRandomTile,
  moveLeft,
  moveRight,
  moveUp,
  moveDown,
  hasMoves,
  areGridsEqual,
} from '../utils/gameHelpers';

interface GameState {
  grid: Grid;
  score: number;
  bestScore: number;
  status: 'playing' | 'won' | 'game-over';
}

type Action =
  | { type: 'MOVE'; direction: 'up' | 'down' | 'left' | 'right' }
  | { type: 'RESET' }
  | { type: 'CONTINUE' }
  | { type: 'SET_BEST_SCORE'; score: number };

const initialState: GameState = {
  grid: createEmptyGrid(),
  score: 0,
  bestScore: 0,
  status: 'playing',
};

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'RESET':
      return {
        ...state,
        grid: addRandomTile(addRandomTile(createEmptyGrid())),
        score: 0,
        status: 'playing',
      };
    case 'CONTINUE':
      return {
        ...state,
        status: 'playing',
      };
    case 'SET_BEST_SCORE':
      return {
        ...state,
        bestScore: action.score,
      };
    case 'MOVE': {
      if (state.status !== 'playing') return state;

      let result;
      switch (action.direction) {
        case 'up':
          result = moveUp(state.grid);
          break;
        case 'down':
          result = moveDown(state.grid);
          break;
        case 'left':
          result = moveLeft(state.grid);
          break;
        case 'right':
          result = moveRight(state.grid);
          break;
      }

      if (areGridsEqual(state.grid, result.grid)) {
        return state;
      }

      const newGrid = addRandomTile(result.grid);
      const newScore = state.score + result.score;
      const newStatus = hasMoves(newGrid) ? 'playing' : 'game-over';

      // Check for 2048 win condition
      let won = false;
      newGrid.forEach(row => {
        row.forEach(tile => {
          if (tile?.value === 2048 && !tile.mergedFrom) { // Check if newly created 2048
             // Actually, checking if any tile is 2048 is enough, but we want to trigger it once.
             // But for simplicity, we can just check if we have a 2048 tile and status is playing.
             // We'll handle the 'won' state transition carefully.
          }
        });
      });
      
      // If we want to stop at 2048
      const has2048 = newGrid.some(row => row.some(cell => cell?.value === 2048));
      const finalStatus = has2048 && state.status !== 'won' ? 'won' : newStatus;

      return {
        ...state,
        grid: newGrid,
        score: newScore,
        bestScore: Math.max(state.bestScore, newScore),
        status: finalStatus,
      };
    }
    default:
      return state;
  }
};

export const useGameLogic = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const savedBest = localStorage.getItem('2048-best-score');
    if (savedBest) {
      dispatch({ type: 'SET_BEST_SCORE', score: parseInt(savedBest, 10) });
    }
    dispatch({ type: 'RESET' });
  }, []);

  useEffect(() => {
    localStorage.setItem('2048-best-score', state.bestScore.toString());
  }, [state.bestScore]);

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    dispatch({ type: 'MOVE', direction });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const continueGame = useCallback(() => {
    dispatch({ type: 'CONTINUE' });
  }, []);

  return {
    ...state,
    move,
    reset,
    continueGame,
  };
};
