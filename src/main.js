import './style.css';
import SceneManager from './components/SceneManager.js';
import TerrainSystem from './components/TerrainSystem.js';
import WaterSystem from './components/WaterSystem.js';
import LightingSystem from './components/LightingSystem.js';
import InteractionController from './components/InteractionController.js';

const app = document.getElementById('app');
const sceneManager = new SceneManager(app);

// Initialize systems
const terrainSystem = new TerrainSystem(sceneManager);
const waterSystem = new WaterSystem(sceneManager, terrainSystem);
const lightingSystem = new LightingSystem(sceneManager);
const interactionController = new InteractionController(sceneManager, {
  terrain: terrainSystem,
  water: waterSystem,
  lighting: lightingSystem
});

// Start render loop
function animate() {
  requestAnimationFrame(animate);
  
  const time = performance.now() * 0.001;
  
  terrainSystem.update(time);
  waterSystem.update(time);
  lightingSystem.update(time);
  interactionController.update();
  
  sceneManager.render();
}

animate();
