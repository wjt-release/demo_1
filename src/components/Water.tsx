import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Flowing water effect
    float flowSpeed = 0.5;
    uv.y += uTime * flowSpeed;
    
    // Simple wave pattern
    float wave = sin(uv.y * 10.0 + uv.x * 5.0) * 0.1;
    wave += sin(uv.y * 20.0 - uv.x * 10.0) * 0.05;
    
    vec3 color = uColor + wave;
    
    // Specular highlight approximation (fake reflection)
    float highlight = step(0.9, wave + 0.5);
    color += highlight * 0.5;

    gl_FragColor = vec4(color, 0.8);
  }
`;

export const Water = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color('#4fa3d1') }
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
