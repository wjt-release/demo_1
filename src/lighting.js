import * as THREE from 'three';

export function createLighting(scene, terrainMaterial) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(50, 50, 50);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);
    
    // Sky gradient
    // We'll use a large sphere with a shader for the sky
    const skyGeometry = new THREE.SphereGeometry(400, 32, 32);
    const skyMaterial = new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * viewMatrix * worldPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float offset;
            uniform float exponent;
            varying vec3 vWorldPosition;
            void main() {
                float h = normalize(vWorldPosition + offset).y;
                gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
            }
        `,
        uniforms: {
            topColor: { value: new THREE.Color(0x0077ff) },
            bottomColor: { value: new THREE.Color(0xffffff) },
            offset: { value: 33 },
            exponent: { value: 0.6 }
        },
        side: THREE.BackSide
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    return {
        update: (time) => {
            // Cycle day/night
            // time is in seconds
            const dayDuration = 60; // 60 seconds per day
            const cycle = (time % dayDuration) / dayDuration;
            const angle = cycle * Math.PI * 2;
            
            // Move sun
            const radius = 100;
            sunLight.position.x = Math.cos(angle) * radius;
            sunLight.position.y = Math.sin(angle) * radius;
            sunLight.position.z = Math.sin(angle * 0.5) * 50; // Slight wobble
            
            // Update light intensity based on height
            const sunHeight = Math.sin(angle);
            sunLight.intensity = Math.max(0, sunHeight);
            ambientLight.intensity = Math.max(0.05, sunHeight * 0.3 + 0.1);
            
            // Update sky colors
            if (sunHeight > 0.2) {
                // Day
                skyMaterial.uniforms.topColor.value.setHSL(0.6, 1, 0.6);
                skyMaterial.uniforms.bottomColor.value.setHSL(0.6, 0.2, 0.8);
            } else if (sunHeight > -0.2) {
                // Sunset/Sunrise
                skyMaterial.uniforms.topColor.value.setHSL(0.1, 0.8, 0.4); // Orange/Purple
                skyMaterial.uniforms.bottomColor.value.setHSL(0.05, 0.8, 0.6);
            } else {
                // Night
                skyMaterial.uniforms.topColor.value.setHSL(0.65, 1, 0.05); // Deep blue/black
                skyMaterial.uniforms.bottomColor.value.setHSL(0.65, 0.8, 0.1);
            }

            // Update terrain uniform for lighting direction
            if (terrainMaterial && terrainMaterial.uniforms) {
                terrainMaterial.uniforms.uLightDirection.value.copy(sunLight.position);
            }
            
            return {
                isDay: sunHeight > 0,
                timeString: formatTime(cycle)
            };
        }
    };
}

function formatTime(cycle) {
    // 0 = 6am (sunrise), 0.25 = 12pm, 0.5 = 6pm, 0.75 = 12am
    // Adjust so 0 is midnight?
    // Let's say cycle 0 is sunrise (6am)
    let hours = (cycle * 24 + 6) % 24;
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}
