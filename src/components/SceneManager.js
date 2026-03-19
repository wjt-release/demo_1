import * as THREE from 'three';

export default class SceneManager {
    constructor(container) {
        this.container = container;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb); // Initial sky color
        this.scene.fog = new THREE.FogExp2(0x87ceeb, 0.002);

        this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 1000);
        this.camera.position.set(0, 50, 100);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        container.appendChild(this.renderer.domElement);

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
