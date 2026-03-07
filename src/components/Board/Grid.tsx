import React, { useEffect, useRef } from 'react';
import { Tile as TileComponent } from './Tile';
import { Cell } from './Cell';
import { Grid as GridType, Tile } from '../../utils/gameHelpers';

interface GridProps {
  grid: GridType;
}

export const Grid: React.FC<GridProps> = ({ grid }) => {
  const tiles: Tile[] = [];
  
  // Flatten grid to get tiles
  grid.forEach((row) => {
    row.forEach((tile) => {
      if (tile) {
        tiles.push(tile);
      }
    });
  });

  return (
    <div className="relative w-full max-w-[400px] aspect-square bg-black/40 backdrop-blur-md rounded-xl p-2 border border-cyber-glass shadow-[0_0_20px_rgba(0,243,255,0.1)]">
      {/* Background Grid */}
      <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full absolute inset-0 p-2 z-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <Cell key={i} />
        ))}
      </div>

      {/* Tiles Layer */}
      <div className="relative w-full h-full z-10">
         {/* 
            We need a container that matches the grid dimensions exactly for absolute positioning to work relative to it.
            The padding in the parent container handles the gap on the edges.
            But the gaps between cells need to be accounted for in Tile positioning.
            
            If we use percentage-based positioning in Tile (0%, 25%, 50%, 75%),
            it assumes no gaps or we need to offset.
            
            Actually, using CSS Grid for the background is easy.
            For tiles, we can use `calc()` or just rely on the fact that 
            x = c * 25% is technically correct if the container includes gaps?
            No.
            
            If we have gaps, absolute positioning with percentages is tricky.
            
            Alternative:
            Use CSS Grid for tiles too? But we need animation.
            Framer Motion `layout` prop works with CSS Grid!
            
            Let's try that.
            
            But we need to render ALL tiles in a flat list.
            And we need to position them.
            
            If we use absolute position, we should calculate pixels or use calc.
            width = (100% - 3 * gap) / 4
            left = col * (width + gap)
            
            Let's simplify.
            We can make the Tile wrapper position absolute.
            But implementing the exact math for gaps in Tailwind is tricky with dynamic values.
            
            Let's use a known gap size, e.g. 0.5rem (8px).
            
            width = calc((100% - 24px) / 4)
            left = calc(col * ((100% - 24px) / 4 + 8px))
            
            Actually, the previous Tile implementation used:
            width: 25%
            left: c * 100%
            padding: 2
            
            If the container is 100% width, and we have 4 columns.
            Each column is 25%.
            Inside the column, we have padding.
            This simulates the gap!
            
            So `w-1/4 h-1/4 p-2` in Tile.tsx.
            The `p-2` creates the visual gap between the inner content (the colored box) and the cell boundary.
            This works perfectly if the background grid also aligns.
            
            Background Grid:
            `grid grid-cols-4 gap-2 p-2`
            
            Wait.
            If `gap-2` (0.5rem) is used in grid, the cells are smaller.
            The total width is `4 * cell + 3 * gap`.
            
            If we use `p-2` in Tile, the Tile is 25% of TOTAL width.
            So 4 tiles = 100%.
            But visual gap is created by padding.
            
            Does the background grid match?
            Background grid using `gap-2` will spacing cells.
            Total width = `4*w + 3*gap`.
            
            If we want to match, the background should probably ALSO use the same logic.
            Instead of `gap-2`, use `p-2` on each cell wrapper?
            
            Let's change Cell.tsx to be just the inner div, and Grid render it wrapped.
            
            Grid.tsx:
            Background:
            div className="flex flex-wrap w-full h-full absolute inset-0"
              16x div className="w-1/4 h-1/4 p-2" -> Cell
            
            This matches the Tile logic!
         */}
         
        {/* Background Grid - adjusted to match Tile positioning */}
        <div className="flex flex-wrap w-full h-full absolute inset-0 z-0">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1/4 h-1/4 p-2">
              <Cell />
            </div>
          ))}
        </div>

        {/* Tiles */}
        {tiles.map((tile) => (
          <TileComponent key={tile.id} tile={tile} />
        ))}
      </div>
    </div>
  );
};
