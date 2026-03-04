# Technical Architecture Document

## Overview
This document outlines the technical architecture for the 3D Mountain Scene project. The project will leverage WebGL via Three.js to render a high-quality 3D environment directly in the browser.

## Technology Stack
-   **Frontend Framework**: HTML5, CSS3, JavaScript (ES6+).
-   **3D Library**: Three.js (standard for WebGL).
-   **Shader Language**: GLSL (for custom shaders if needed).
-   **Build Tool**: Vite (fast and modern).

## Core Components

### 1. Scene Manager (`SceneManager.js`)
-   Initializes the Three.js scene, camera, and renderer.
-   Manages the render loop.
-   Handles window resize events.

### 2. Terrain System (`TerrainSystem.js`)
-   **Generation**: Uses Perlin noise or Simplex noise to generate heightmaps.
-   **Mesh**: Creates a `PlaneGeometry` modified by the heightmap.
-   **Materials**: Uses custom shaders or standard materials with vertex colors based on height.
-   **Contour Lines**: Implements a shader pass or line segments for contour visualization.

### 3. Water System (`WaterSystem.js`)
-   **River Generation**: Identifies low points in the terrain to place water meshes.
-   **Shader**: Uses a custom shader for water movement and reflection.

### 4. Lighting System (`LightingSystem.js`)
-   **Day/Night Cycle**: Controls the position and color of the directional light (sun) and ambient light.
-   **Atmosphere**: Adjusts fog density and color based on time of day.

### 5. Interaction Controller (`InteractionController.js`)
-   **Camera Controls**: Uses `OrbitControls` for drag and zoom.
-   **UI Handling**: Manages the contour toggle and other UI elements.

## Data Flow
1.  **Initialization**: `main.js` initializes `SceneManager`, `TerrainSystem`, `WaterSystem`, `LightingSystem`, and `InteractionController`.
2.  **Render Loop**: `SceneManager` calls update methods on all systems every frame.
3.  **User Input**: `InteractionController` captures input and updates camera/scene state.
4.  **Updates**: Systems update their internal state (e.g., sun position, water animation) and reflect changes in the scene.

## File Structure
```
/src
  /components
    SceneManager.js
    TerrainSystem.js
    WaterSystem.js
    LightingSystem.js
    InteractionController.js
  /shaders
    terrain.vert
    terrain.frag
    water.vert
    water.frag
  main.js
  style.css
index.html
package.json
vite.config.js
```

## External Dependencies
-   `three`: Core 3D library.
-   `dat.gui` (optional): For debugging and parameter tuning.
-   `simplex-noise`: For terrain generation.
