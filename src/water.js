import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    vPosition = modelPosition.xyz;
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vPosition;

// Simple pseudo-random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// 2D Noise
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
    vec2 uv = vUv * 10.0;
    
    // Animate UVs for flow
    uv.x += uTime * 0.1;
    uv.y += uTime * 0.05;
    
    float n = noise(uv);
    
    vec3 color = uColor;
    
    // Add some sparkle/foam
    color += vec3(n * 0.2);
    
    // Make water transparent
    float alpha = 0.8;
    
    gl_FragColor = vec4(color, alpha);
}
`;

export function createWater(scene) {
    const geometry = new THREE.PlaneGeometry(100, 100);
    geometry.rotateX(-Math.PI / 2);
    
    // Water level
    geometry.translate(0, 0.8, 0);

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('#006994') }
        },
        transparent: true,
        side: THREE.DoubleSide
    });

    const water = new THREE.Mesh(geometry, material);
    scene.add(water);
    
    return { mesh: water, material };
}
