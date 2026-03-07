import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { Tile as TileType } from '../../utils/gameHelpers';
import { getTileColor, getTileTextColor } from '../../utils/theme';

interface TileProps {
  tile: TileType;
}

export const Tile: React.FC<TileProps> = ({ tile }) => {
  const { value, position, isNew, mergedFrom } = tile;
  const [r, c] = position;

  // Calculate position percentage
  // Grid is 4x4. Gap is likely small.
  // We'll use CSS grid or absolute positioning.
  // Absolute positioning is smoother for animations.
  // Assuming 100% width/height of container.
  // Each cell is 25%.
  const x = c * 100 + '%';
  const y = r * 100 + '%';

  return (
    <motion.div
      initial={isNew ? { scale: 0, opacity: 0 } : false}
      animate={{ 
        x: `${c * 100}%`, 
        y: `${r * 100}%`, 
        scale: 1, 
        opacity: 1 
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 200, 
        damping: 20 
      }}
      className={clsx(
        'absolute w-1/4 h-1/4 p-2', // Wrapper for padding
        'flex items-center justify-center'
      )}
      style={{
        top: 0,
        left: 0,
      }}
    >
      <div
        className={clsx(
          'w-full h-full rounded-lg border-2 flex items-center justify-center text-2xl font-bold font-display transition-colors duration-300 backdrop-blur-sm',
          getTileColor(value),
          getTileTextColor(value)
        )}
      >
        {value}
        {mergedFrom && (
          <motion.div
            initial={{ scale: 1.2, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/30 rounded-lg"
          />
        )}
      </div>
    </motion.div>
  );
};
