# Product Requirements Document: Simplified Battle City Game

## 1. Introduction
The goal is to develop a simplified version of the classic "Battle City" (Tank Battle) game using HTML, CSS, and JavaScript (Canvas). The entire game must be contained within a single `index.html` file for easy distribution and execution.

## 2. User Stories
- As a player, I want to control a tank using arrow keys to move and spacebar to shoot.
- As a player, I want to destroy enemy tanks to progress.
- As a player, I want to protect my base from enemy attacks.
- As a player, I want clear visual feedback when hitting walls or enemies.
- As a player, I want to collect power-ups to enhance my tank's abilities.
- As a player, I want to see a victory screen upon destroying a set number of enemies.
- As a player, I want to see a game over screen if my base is destroyed or I lose all lives.

## 3. Functional Requirements (P1 - Core)
### 3.1 Player Control & AI
- **Player Tank:** Controlled via Arrow Keys (Up, Down, Left, Right) and Spacebar (Shoot).
- **AI Tank:** Spawns periodically, moves randomly, and shoots towards the player or base.
- **Interaction:** Player bullets destroy enemies; enemy bullets damage player.

### 3.2 Map & Collision
- **Terrain Types:**
    - **Brick Wall:** Destructible by bullets.
    - **Iron Wall:** Indestructible; bullets stop or bounce (simple stop).
    - **Grass:** Visual cover; does not block movement or bullets.
    - **Base:** The objective to protect. Destructible.
- **Collision Rules:**
    - Tanks cannot pass through walls or each other.
    - Bullets destroy bricks and enemies.
    - Bullets are stopped by iron walls.
    - Bullets destroy the base (Game Over).

### 3.3 Win/Loss Conditions
- **Win:** Destroy a specific number of enemy tanks (e.g., 20).
- **Loss:** Player lives reach 0 OR Base is destroyed.
- **UI:** Start Screen, Game Loop, Victory/Game Over screens with "Retry" button.

### 3.4 Power-ups
- **Drop Mechanism:** Specific enemies drop items upon death.
- **Types:**
    - **Attack Up:** Increases bullet speed or damage (visual effect).
    - **Life Up:** Adds an extra life.
- **Effect:** Immediate application upon pickup.

## 4. Secondary Requirements (P2 - Optional/Simplified)
- **Time Limit:** 3 minutes per round. Timeout = Draw/Loss.
- **Cooldowns:** Limit fire rate to prevent spamming.
- **Persistence:** Save high score or progress to `localStorage`.
- **Difficulty:** Progressive difficulty (faster enemies) if possible.

## 5. Constraints
- **Format:** Single `index.html` file.
- **Tech Stack:** Vanilla HTML/CSS/JS (Canvas). No external libraries.
- **Graphics:** Use simple geometric shapes and colors if sprites are not available, or base64 encoded simple assets.
