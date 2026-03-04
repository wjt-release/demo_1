# Product Requirements Document (PRD): Simplified Battle City (Tank Battle)

## 1. Introduction
This document outlines the requirements for a simplified version of the classic "Battle City" game, implemented as a single-file HTML5 application using Canvas. The goal is to provide a playable, self-contained game that demonstrates core mechanics like movement, shooting, collision detection, and enemy AI.

## 2. User Stories
- As a player, I want to control a tank using keyboard inputs so that I can navigate the battlefield.
- As a player, I want to shoot bullets to destroy enemy tanks and brick walls.
- As a player, I want to defend my base from enemy attacks.
- As a player, I want to pick up items to enhance my tank's abilities.
- As a player, I want to see a victory screen when I defeat all enemies or a game over screen if I lose.

## 3. Functional Requirements

### 3.1. Core Gameplay (P1)
- **Player Control:**
  - Movement: Arrow keys or WASD (Up, Down, Left, Right).
  - Action: Spacebar to shoot.
  - Movement is grid-based or smooth but constrained by obstacles.
- **AI Enemies:**
  - Spawn periodically at fixed locations.
  - Move randomly or with basic tracking logic.
  - Shoot randomly.
- **Map Elements:**
  - **Brick Walls:** Destructible by player and enemy bullets.
  - **Iron Walls:** Indestructible; bullets are blocked or destroyed.
  - **Grass:** Visual overlay; does not block movement or bullets.
  - **Base:** The player's objective to defend. Destructible.
  - **Boundaries:** Tanks cannot move outside the canvas.
- **Collision Detection:**
  - Tank vs. Wall/Map Boundary: Stop movement.
  - Bullet vs. Tank: Destroy tank (reduce enemy count or player life).
  - Bullet vs. Bullet: Mutual destruction (optional, for polish).
  - Bullet vs. Wall: Damage/Destroy brick, destroy bullet on iron.
  - Tank vs. Item: Apply effect.
- **Game Loop:**
  - Win Condition: Destroy a set number of enemies (e.g., 20).
  - Lose Condition: Player lives reach 0 OR Base is destroyed.
  - Restart: Ability to restart the game after Win/Loss.

### 3.2. Items & Power-ups (P1)
- **Drop Mechanism:** Specific enemies (e.g., flashing ones) drop items upon death.
- **Item Types:**
  - `Attack Up`: Increases bullet speed or number of bullets.
  - `Life Up`: Adds an extra life.
- **Effect:** Immediate application upon pickup.

### 3.3. Optional Features (P2 - Best Effort)
- **Game Timer:** 3-minute limit per round.
- **Cooldowns:** Limit fire rate to prevent spamming.
- **Progress:** Save high score or level progress to `localStorage`.
- **Difficulty:** Progressive difficulty (enemies get faster/smarter).

## 4. Non-Functional Requirements
- **Single File:** The entire game (HTML, CSS, JS, Assets) must be contained in `index.html`.
  - Assets (images/sounds) should be generated programmatically (Canvas drawing) or Base64 encoded (minimized usage).
- **Performance:** Smooth 60 FPS on modern browsers.
- **Compatibility:** Works in modern Chrome, Firefox, Edge, Safari.
- **Code Quality:** Clean, commented code explaining key mechanics.

## 5. UI/UX
- **Start Screen:** Title, "Press Start" prompt.
- **HUD:** Player Lives, Enemy Count, Score (optional).
- **Game Area:** 800x600 (or similar aspect ratio) Canvas centered on screen.
- **End Screens:** "VICTORY" or "GAME OVER" overlay with "Play Again" button.
