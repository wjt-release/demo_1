import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

export default class TerrainSystem {
    constructor(sceneManager) {
        this.sceneManager = sceneManager;
        this.scene = sceneManager.scene;
        
        this.noise2D = createNoise2D();
        this.geometry = null;
        this.material = null;
        this.mesh = null;
        this.showContours = false;

        this.init();
    }

    init() {
        const size = 200;
        const segments = 256;
        
        this.geometry = new THREE.PlaneGeometry(size, size, segments, segments);
        this.geometry.rotateX(-Math.PI / 2);

        const positions = this.geometry.attributes.position;
        const colors = [];
        const count = positions.count;
        
        for (let i = 0; i < count; i++) {
            const x = positions.getX(i);
            const z = positions.getZ(i);
            
            // Layered noise for realistic terrain
            let y = 0;
            y += this.noise2D(x * 0.01, z * 0.01) * 20;
            y += this.noise2D(x * 0.05, z * 0.05) * 5;
            y += this.noise2D(x * 0.1, z * 0.1) * 1;
            
            // Add some cliffs
            if (y > 10) {
                y += Math.pow(y - 10, 1.5) * 0.5;
            }
            
            positions.setY(i, y);

            // Color based on height
            const color = new THREE.Color();
            if (y < -5) {
                color.setHex(0x2b65ec); // Deep water
            } else if (y < 2) {
                color.setHex(0xe0d0a0); // Sand
            } else if (y < 15) {
                color.setHex(0x228b22); // Grass
            } else if (y < 30) {
                color.setHex(0x808080); // Rock
            } else {
                color.setHex(0xffffff); // Snow
            }
            colors.push(color.r, color.g, color.b);
        }

        this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        this.geometry.computeVertexNormals();

        this.material = new THREE.MeshStandardMaterial({
            vertexColors: true,
            roughness: 0.8,
            metalness: 0.1,
            side: THREE.DoubleSide
        });

        this.material.onBeforeCompile = (shader) => {
            shader.uniforms.uShowContours = { value: 0 };
            shader.uniforms.uContourInterval = { value: 2.0 };
            shader.uniforms.uContourWidth = { value: 0.05 };
            
            this.material.userData.shader = shader;

            shader.vertexShader = `
                varying float vHeight;
                ${shader.vertexShader}
            `.replace(
                '#include <begin_vertex>',
                `
                #include <begin_vertex>
                vHeight = position.y;
                `
            );

            shader.fragmentShader = `
                uniform int uShowContours;
                uniform float uContourInterval;
                varying float vHeight;
                ${shader.fragmentShader}
            `.replace(
                '#include <dithering_fragment>',
                `
                #include <dithering_fragment>
                if (uShowContours == 1) {
                    float f = fract(vHeight / uContourInterval);
                    float df = fwidth(vHeight / uContourInterval);
                    if (f < df * 1.5) {
                        gl_FragColor = mix(gl_FragColor, vec4(0.0, 0.0, 0.0, 1.0), 0.5);
                    }
                }
                `
            );
        };

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
    }

    update(time) {
        // Optional: animate terrain or update uniforms if needed
    }

    toggleContours(value) {
        if (this.material.userData.shader) {
            this.material.userData.shader.uniforms.uShowContours.value = value ? 1 : 0;
        }
    }
}
