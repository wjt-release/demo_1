import * as THREE from 'three';

export default class LightingSystem {
    constructor(sceneManager) {
        this.scene = sceneManager.scene;
        this.time = 0;
        this.dayDuration = 60; // seconds for full cycle

        this.ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(this.ambientLight);

        this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.mapSize.width = 2048;
        this.sunLight.shadow.mapSize.height = 2048;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 500;
        this.sunLight.shadow.camera.left = -100;
        this.sunLight.shadow.camera.right = 100;
        this.sunLight.shadow.camera.top = 100;
        this.sunLight.shadow.camera.bottom = -100;
        this.scene.add(this.sunLight);
    }

    update(dt) {
        this.time = (dt % this.dayDuration) / this.dayDuration;
        
        const angle = this.time * Math.PI * 2;
        const radius = 100;
        
        this.sunLight.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            Math.sin(angle) * 20
        );

        // Adjust colors based on time of day
        // Dawn/Dusk
        const sunHeight = Math.sin(angle);
        
        if (sunHeight < 0) {
            // Night
            this.sunLight.intensity = 0;
            this.ambientLight.intensity = 0.1;
            this.scene.background.setHex(0x000022);
            this.scene.fog.color.setHex(0x000022);
        } else {
            // Day
            this.sunLight.intensity = Math.max(0.1, sunHeight);
            this.ambientLight.intensity = 0.5;
            
            // Sky color interpolation could be better, but simple switch for now
            if (sunHeight < 0.2) {
                // Sunrise/Sunset
                this.scene.background.setHex(0xffa07a);
                this.scene.fog.color.setHex(0xffa07a);
            } else {
                // Noon
                this.scene.background.setHex(0x87ceeb);
                this.scene.fog.color.setHex(0x87ceeb);
            }
        }
    }
}
