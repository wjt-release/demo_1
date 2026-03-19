import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

const vertexShader = `
varying float vElevation;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vElevation = position.y;
    vNormal = normalMatrix * normal;
    vUv = uv;
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColorWater;
uniform vec3 uColorSand;
uniform vec3 uColorGrass;
uniform vec3 uColorRock;
uniform vec3 uColorSnow;
uniform bool uShowContours;
uniform vec3 uLightDirection;

varying float vElevation;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    // Basic diffuse lighting
    vec3 lightDir = normalize(uLightDirection);
    float diff = max(dot(vNormal, lightDir), 0.0);
    
    // Ambient light
    vec3 ambient = vec3(0.3);
    
    // Base color mixing based on elevation
    vec3 color = uColorWater;
    
    float sandHeight = 1.5;
    float grassHeight = 3.5;
    float rockHeight = 8.0;
    float snowHeight = 12.0;
    
    if (vElevation < sandHeight) {
        color = mix(uColorWater, uColorSand, smoothstep(0.0, sandHeight, vElevation));
    } else if (vElevation < grassHeight) {
        color = mix(uColorSand, uColorGrass, smoothstep(sandHeight, grassHeight, vElevation));
    } else if (vElevation < rockHeight) {
        color = mix(uColorGrass, uColorRock, smoothstep(grassHeight, rockHeight, vElevation));
    } else {
        color = mix(uColorRock, uColorSnow, smoothstep(rockHeight, snowHeight, vElevation));
    }

    // Apply lighting
    vec3 lighting = ambient + diff * vec3(1.0);
    vec3 finalColor = color * lighting;

    // Contour lines
    if (uShowContours) {
        float contourInterval = 2.0;
        float contourWidth = 0.05;
        // Use fract to create repeating lines based on elevation
        float dist = fract(vElevation / contourInterval);
        // Make line visible if close to 0 or 1
        if (dist < contourWidth || dist > 1.0 - contourWidth) {
            finalColor = mix(finalColor, vec3(1.0), 0.8);
        }
    }

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

export function createTerrain(scene) {
    // Increase segments for better detail
    const geometry = new THREE.PlaneGeometry(100, 100, 256, 256);
    geometry.rotateX(-Math.PI / 2);

    const positions = geometry.attributes.position;
    const count = positions.count;
    
    // Generate height map
    for (let i = 0; i < count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        
        let elevation = 0;
        // Base terrain
        elevation += noise2D(x * 0.02, z * 0.02) * 8;
        // Detail
        elevation += noise2D(x * 0.08, z * 0.08) * 3;
        // Fine detail
        elevation += noise2D(x * 0.2, z * 0.2) * 0.5;
        
        // River carving: use absolute value of noise to create a channel
        let riverNoise = noise2D(x * 0.015 + 100, z * 0.015 + 100); 
        let riverVal = Math.abs(riverNoise);
        
        // If riverVal is small (near 0), we are in the river center
        let riverWidth = 0.1;
        if (riverVal < riverWidth) {
             // Smooth transition into river using THREE.MathUtils.smoothstep
             // smoothstep(x, min, max) returns 0..1
             // We want 0 at river center (riverVal=0) and 1 at riverWidth
             let smoothFactor = THREE.MathUtils.smoothstep(riverVal, 0.0, riverWidth);
             
             elevation *= smoothFactor; 
             // Ensure river bed is low but not too deep
             if (elevation < 0.5) elevation = 0.5;
        }

        // Apply height
        // Ensure minimum base height for water
        if (elevation < 0) elevation = 0; 
        
        positions.setY(i, elevation);
    }
    
    // Recompute normals for lighting
    geometry.computeVertexNormals();

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uColorWater: { value: new THREE.Color('#004d40') }, // Dark teal for deep water base
            uColorSand: { value: new THREE.Color('#e0cda9') },
            uColorGrass: { value: new THREE.Color('#4caf50') },
            uColorRock: { value: new THREE.Color('#795548') },
            uColorSnow: { value: new THREE.Color('#ffffff') },
            uShowContours: { value: false },
            uLightDirection: { value: new THREE.Vector3(1, 1, 1) }
        },
        side: THREE.DoubleSide
    });

    const terrain = new THREE.Mesh(geometry, material);
    scene.add(terrain);
    
    return { mesh: terrain, material, geometry };
}
