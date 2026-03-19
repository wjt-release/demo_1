import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createTerrain } from './src/terrain.js';
import { createWater } from './src/water.js';
import { createLighting } from './src/lighting.js';

// Setup Scene
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

// Setup Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 60);

// Setup Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 2 - 0.1; // Prevent going below ground

// Create Objects
const terrain = createTerrain(scene);
const water = createWater(scene);
const lighting = createLighting(scene, terrain.material);

// UI Logic
const contourToggle = document.getElementById('contour-toggle');
contourToggle.addEventListener('change', (e) => {
    terrain.material.uniforms.uShowContours.value = e.target.checked;
});

const timeDisplay = document.getElementById('time-display');

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    const elapsedTime = clock.getElapsedTime();

    // Update Water
    water.material.uniforms.uTime.value = elapsedTime;

    // Update Lighting & Time
    const lightStatus = lighting.update(elapsedTime);
    
    // Update UI
    if (lightStatus && lightStatus.timeString) {
        timeDisplay.innerText = lightStatus.timeString;
    }
    
    // Update Fog Color based on sky (simple approximation)
    // In a real app, match sky bottom color
    // scene.fog.color.setHSL(...)

    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
