import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

export default class InteractionController {
    constructor(sceneManager, systems) {
        this.camera = sceneManager.camera;
        this.renderer = sceneManager.renderer;
        this.systems = systems;

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 200;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.1; // Don't go below ground

        this.initGUI();
    }

    initGUI() {
        const gui = new dat.GUI();
        
        const terrainFolder = gui.addFolder('Terrain');
        const terrainParams = {
            contours: false
        };
        terrainFolder.add(terrainParams, 'contours').name('Show Contours').onChange((value) => {
            this.systems.terrain.toggleContours(value);
        });
        terrainFolder.open();

        const lightingFolder = gui.addFolder('Lighting');
        // Add manual time control override later if needed
    }

    update() {
        this.controls.update();
    }
}
