# Technical Architecture Document

## 1. Architecture Design

```mermaid
graph TD
    subgraph Browser
        A[HTML5 Canvas]
        B[Game Loop (requestAnimationFrame)]
        C[Input Handler]
        D[Game State Manager]
        
        B --> D
        C --> D
        D --> A
    end
```

## 2. Technology Description
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Rendering**: Canvas API (2D Context).
- **Constraint**: **SINGLE FILE OUTPUT** (All CSS/JS embedded in HTML).
- **No External Libraries**: No React, No Phaser. Pure JS implementation.

## 3. Component Structure (Logical)

### 3.1 Game Engine
- `Game`: Main class managing the loop, stage, and state.
- `Input`: Handles keyboard events (`keydown`, `keyup`).
- `Renderer`: Handles drawing shapes/sprites to the canvas.

### 3.2 Entities
- `Entity` (Base Class): x, y, width, height, direction, speed.
- `Tank` (extends Entity): health, cooldown, bulletType.
  - `Player`: Controlled by Input.
  - `Enemy`: Controlled by AI logic (random movement/shooting).
- `Bullet`: Moves linearly, checks collision each frame.
- `Tile`: Static map elements.
  - `Brick`: Destructible (requires collision resolution).
  - `Iron`: Indestructible.
  - `Grass`: Overlay (render after entities).
  - `Base`: The eagle/flag.
- `Item`: Power-ups (Star, Tank).

### 3.3 Systems
- **Collision Detection**: AABB (Axis-Aligned Bounding Box) for all entities.
- **AI System**: Simple state machine for enemies (Move Forward -> Hit Wall/Time -> Change Direction).
- **Spawner**: Manages enemy waves and positions.

## 4. Data Structures

### 4.1 Map Data
- Represented as a 2D array or grid of integers.
- 0: Empty, 1: Brick, 2: Iron, 3: Grass, 4: Water (optional), 9: Base.

### 4.2 Game State
```javascript
{
  stage: 1,
  playerLives: 3,
  enemiesRemaining: 20,
  activeEnemies: [],
  bullets: [],
  map: [],
  gameState: 'MENU' | 'PLAYING' | 'GAMEOVER' | 'VICTORY'
}
```

## 5. Implementation Strategy
1. **Setup**: HTML skeleton with `<canvas>` and embedded `<style>`.
2. **Core Loop**: `requestAnimationFrame` driving `update()` and `draw()`.
3. **Input**: Track key states in a set/object.
4. **Classes**: Implement ES6 classes for modularity within the single script tag.
5. **Assets**: Draw tanks and walls using `ctx.fillRect`, `ctx.arc`, etc., to avoid external image loading issues.
