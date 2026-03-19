import * as THREE from 'three';

export default class WaterSystem {
    constructor(sceneManager, terrainSystem) {
        this.scene = sceneManager.scene;
        
        const size = 200;
        const geometry = new THREE.PlaneGeometry(size, size);
        geometry.rotateX(-Math.PI / 2);

        this.uniforms = {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(0x0077be) }
        };

        const material = new THREE.MeshStandardMaterial({
            color: 0x0077be,
            transparent: true,
            opacity: 0.6,
            roughness: 0.1,
            metalness: 0.8,
            side: THREE.DoubleSide
        });
        
        // Simple water level at y = -2
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.y = -2;
        this.scene.add(this.mesh);
    }

    update(time) {
        // Could add shader animation here if using custom shader
        this.mesh.position.y = -2 + Math.sin(time * 0.5) * 0.2; // Simple tide
    }
}
