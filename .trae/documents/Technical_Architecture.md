# Technical Architecture: Simplified Battle City

## 1. System Overview
The application is a standalone HTML5 game utilizing the `<canvas>` API for rendering. It follows a standard Game Loop architecture (Update -> Draw) driven by `requestAnimationFrame`.

## 2. File Structure
A single `index.html` file containing:
- `<style>`: CSS for centering the canvas and basic UI styling.
- `<body>`: Container for the canvas and UI overlays.
- `<script>`: All game logic, classes, and rendering code.

## 3. Core Components (Classes/Objects)

### 3.1. `Game` Class
- Manages the game state (Menu, Playing, GameOver, Victory).
- Handles the game loop (`update()`, `draw()`).
- Manages entities (Player, Enemies, Bullets, Map, Items).
- Handles input listeners.

### 3.2. `Entity` Class (Base)
- Properties: `x`, `y`, `width`, `height`, `direction`, `speed`.
- Methods: `draw()`, `update()`, `getRect()`.

### 3.3. `Tank` Class (extends Entity)
- Properties: `cooldown`, `isMoving`, `lives` (for player).
- Methods: `move()`, `shoot()`, `collideWithMap()`.
- Subclasses: `PlayerTank`, `EnemyTank`.

### 3.4. `Bullet` Class (extends Entity)
- Properties: `owner` (Player/Enemy), `damage`.
- Methods: `update()` (movement), `checkCollision()`.

### 3.5. `Map` / `Tile` System
- Grid-based map (e.g., 26x26 grid).
- Tile Types:
  - `0`: Empty
  - `1`: Brick (Destructible)
  - `2`: Iron (Indestructible)
  - `3`: Grass (Overlay)
  - `4`: Base (Objective)
  - `9`: Spawner (Spawn points)
- Map data stored as a 2D array or string array.

### 3.6. `Item` Class
- Spawns at enemy death location.
- Checks collision with Player.

## 4. Key Algorithms

### 4.1. Collision Detection
- **AABB (Axis-Aligned Bounding Box):** Used for all entity collisions.
- **Spatial Partitioning (Optional):** Likely not needed for low entity count, simple loop checks suffice.
- **Bullet vs. Wall:** Calculate grid position of bullet. If grid cell is a wall, resolve collision (destroy bullet/wall).

### 4.2. AI Behavior
- **State Machine:**
  - `Idle/Move`: Pick a random direction, move until blocked or timer expires.
  - `Shoot`: Random chance to shoot per frame (throttled).
- **Spawning:**
  - Spawn enemy at one of 3 top spawn points if total enemies < max concurrent.

### 4.3. Rendering
- Clear Canvas.
- Draw Map (Layer 1: Floor/Walls).
- Draw Items.
- Draw Tanks.
- Draw Bullets.
- Draw Map (Layer 2: Grass/Trees - renders *over* tanks).
- Draw HUD (Text).

## 5. Data Storage
- `localStorage`:
  - `battle_city_highscore`: Store best score.
  - `battle_city_state` (Optional): Store current level index if implementing multiple levels.

## 6. Asset Management
- **Graphics:** Procedural drawing using Canvas API (`fillRect`, `arc`, `moveTo/lineTo`) to ensure single-file portability without external image dependencies.
- **Audio:** (Optional) Simple `AudioContext` beeps for shooting/explosions, or omitted for simplicity.
