export type Tile = {
  id: string;
  value: number;
  position: [number, number]; // [row, col]
  mergedFrom?: Tile[];
  isNew?: boolean;
};

export type Grid = (Tile | null)[][];

export const GRID_SIZE = 4;

export const createEmptyGrid = (): Grid => {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null)
  );
};

export const getEmptyCells = (grid: Grid): [number, number][] => {
  const cells: [number, number][] = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (!cell) cells.push([r, c]);
    });
  });
  return cells;
};

export const addRandomTile = (grid: Grid): Grid => {
  const emptyCells = getEmptyCells(grid);
  if (emptyCells.length === 0) return grid;

  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newGrid = grid.map((row) => [...row]);
  
  newGrid[r][c] = {
    id: Math.random().toString(36).substr(2, 9),
    value: Math.random() < 0.9 ? 2 : 4,
    position: [r, c],
    isNew: true,
  };

  return newGrid;
};

export const rotateLeft = (grid: Grid): Grid => {
  const newGrid = createEmptyGrid();
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      newGrid[GRID_SIZE - 1 - c][r] = grid[r][c];
    }
  }
  return newGrid;
};

export const rotateRight = (grid: Grid): Grid => {
  const newGrid = createEmptyGrid();
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      newGrid[c][GRID_SIZE - 1 - r] = grid[r][c];
    }
  }
  return newGrid;
};

export const moveLeft = (grid: Grid): { grid: Grid; score: number } => {
  let score = 0;
  const newGrid: Grid = grid.map((row) => {
    const newRow = row.filter((cell) => cell !== null) as Tile[];
    
    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i].value === newRow[i + 1].value) {
        const mergedValue = newRow[i].value * 2;
        score += mergedValue;
        
        const mergedTile: Tile = {
          id: Math.random().toString(36).substr(2, 9),
          value: mergedValue,
          position: [0, 0], // Placeholder, will be set later
          mergedFrom: [newRow[i], newRow[i + 1]],
        };
        
        newRow[i] = mergedTile;
        newRow.splice(i + 1, 1);
      }
    }
    
    while (newRow.length < GRID_SIZE) {
      newRow.push(null);
    }
    
    return newRow;
  });

  // Update positions
  newGrid.forEach((row, r) => {
    row.forEach((tile, c) => {
      if (tile) {
        tile.position = [r, c];
        if (tile.mergedFrom) {
          tile.mergedFrom.forEach(t => {
            // Keep original positions for animation
          });
        }
      }
    });
  });

  return { grid: newGrid, score };
};

export const moveRight = (grid: Grid): { grid: Grid; score: number } => {
  const rotated = rotateLeft(rotateLeft(grid));
  const { grid: moved, score } = moveLeft(rotated);
  const finalGrid = rotateRight(rotateRight(moved));
  
  // Update positions for final grid
  finalGrid.forEach((row, r) => {
    row.forEach((tile, c) => {
      if (tile) tile.position = [r, c];
    });
  });
  
  return { grid: finalGrid, score };
};

export const moveUp = (grid: Grid): { grid: Grid; score: number } => {
  const rotated = rotateLeft(grid);
  const { grid: moved, score } = moveLeft(rotated);
  const finalGrid = rotateRight(moved);
  
  // Update positions for final grid
  finalGrid.forEach((row, r) => {
    row.forEach((tile, c) => {
      if (tile) tile.position = [r, c];
    });
  });
  
  return { grid: finalGrid, score };
};

export const moveDown = (grid: Grid): { grid: Grid; score: number } => {
  const rotated = rotateRight(grid);
  const { grid: moved, score } = moveLeft(rotated);
  const finalGrid = rotateLeft(moved);
  
  // Update positions for final grid
  finalGrid.forEach((row, r) => {
    row.forEach((tile, c) => {
      if (tile) tile.position = [r, c];
    });
  });
  
  return { grid: finalGrid, score };
};

export const hasMoves = (grid: Grid): boolean => {
  // Check for empty cells
  if (getEmptyCells(grid).length > 0) return true;

  // Check for horizontal merges
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE - 1; c++) {
      if (grid[r][c]?.value === grid[r][c + 1]?.value) return true;
    }
  }

  // Check for vertical merges
  for (let r = 0; r < GRID_SIZE - 1; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c]?.value === grid[r + 1][c]?.value) return true;
    }
  }

  return false;
};

export const areGridsEqual = (g1: Grid, g2: Grid): boolean => {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (g1[r][c]?.value !== g2[r][c]?.value) return false;
    }
  }
  return true;
};
