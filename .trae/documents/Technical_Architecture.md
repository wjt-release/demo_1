# Technical Architecture Document: Simplified Battle City Game

## 1. Technology Stack
- **Language:** HTML5, CSS3, JavaScript (ES6+).
- **Rendering:** HTML5 Canvas API for high-performance 2D rendering.
- **Storage:** `localStorage` for saving high scores/progress (optional).
- **Dependencies:** None (Vanilla JS).

## 2. Architecture Overview
The game will follow a standard Game Loop architecture:
1.  **Init:** Setup canvas, event listeners, and game state.
2.  **Update:** Calculate movement, collisions, AI logic, and state changes.
3.  **Draw:** Render the current state to the Canvas.
4.  **Loop:** Use `requestAnimationFrame` for smooth rendering.

## 3. Key Components (Classes/Objects)
### 3.1 `Game`
- Manages the game loop (`start`, `update`, `draw`, `end`).
- Handles global state (`score`, `lives`, `enemiesRemaining`, `gameState`).
- Manages entity lists (`player`, `enemies`, `bullets`, `powerups`, `map`).

### 3.2 `InputHandler`
- Listens for `keydown` and `keyup` events.
- Maintains the current state of input keys (ArrowUp, ArrowDown, Space, etc.).

### 3.3 `Entity` (Base Class)
- Properties: `x`, `y`, `width`, `height`, `direction`, `speed`, `type`.
- Methods: `move()`, `draw()`, `checkCollision()`.

### 3.4 `Tank` (Extends Entity)
- **PlayerTank:** Controlled by InputHandler. Handles cooldowns and life.
- **EnemyTank:** Controlled by simple AI (random direction change, periodic shooting).

### 3.5 `Bullet` (Extends Entity)
- Moves in a straight line.
- Checks collision with walls, tanks, and base.

### 3.6 `Map`
- Grid-based system (e.g., 26x26 tiles).
- Stores tile types: `0` (Empty), `1` (Brick), `2` (Iron), `3` (Grass), `4` (Base).
- Methods to check tile collision and modify map (destroy bricks).

### 3.7 `CollisionManager`
- Static helper class or functions.
- `rectIntersect(r1, r2)`: AABB collision detection.
- `bulletMapCollision(bullet, map)`: specific logic for bullet-wall interactions.

## 4. File Structure
Single file `index.html` containing:
- `<html><head>...</head><body>...</body></html>`
- `<style>`: CSS for centering canvas and UI overlays.
- `<canvas id="gameCanvas">`: Main rendering surface.
- `<script>`: All game logic classes and functions.

## 5. Implementation Details
- **Assets:** Draw tanks and walls using `ctx.fillRect` and `ctx.beginPath` with distinct colors.
    - Player: Yellow/Green.
    - Enemy: Red/White.
    - Brick: Orange/Brown.
    - Iron: Gray.
    - Grass: Green (semi-transparent).
    - Bullet: White circle.
- **Audio:** (Optional) Simple oscillator beeps using Web Audio API if requested, otherwise silent.
- **Performance:** Minimal object creation in the loop (pool bullets if necessary, but for this scale, `new Bullet()` is fine).
