import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useTerrain } from '@/hooks/useTerrain';
import { useSceneStore } from '@/store/sceneStore';
import type { TerrainConfig } from '@/types';

const vertexShader = `
  varying vec3 vColor;
  varying vec3 vNormal;
  varying float vHeight;
  varying float vSlope;
  varying vec2 vUv;
  
  attribute vec3 color;
  attribute float slope;
  
  void main() {
    vColor = color;
    vNormal = normalMatrix * normal;
    vHeight = position.z;
    vSlope = slope;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uShowContours;
  uniform float uDayTime;
  uniform vec3 uSunDirection;
  
  varying vec3 vColor;
  varying vec3 vNormal;
  varying float vHeight;
  varying float vSlope;
  varying vec2 vUv;
  
  void main() {
    vec3 normal = normalize(vNormal);
    vec3 sunDir = normalize(uSunDirection);
    
    float diffuse = max(dot(normal, sunDir), 0.0);
    float ambient = 0.3;
    
    float dayFactor = smoothstep(0.2, 0.8, uDayTime);
    float nightFactor = 1.0 - dayFactor;
    
    vec3 dayAmbient = vec3(0.4, 0.4, 0.35);
    vec3 nightAmbient = vec3(0.1, 0.1, 0.2);
    vec3 ambientColor = mix(nightAmbient, dayAmbient, dayFactor);
    
    float lightIntensity = mix(ambient, ambient + diffuse * 0.7, dayFactor);
    
    vec3 finalColor = vColor * ambientColor * lightIntensity;
    
    if (vSlope > 0.6) {
      vec3 cliffColor = vec3(0.3, 0.28, 0.25);
      finalColor = mix(finalColor, cliffColor, smoothstep(0.6, 0.8, vSlope));
    }
    
    if (uShowContours > 0.5) {
      float contourInterval = 0.05;
      float contourWidth = 0.003;
      float heightNorm = (vHeight + 1.0) / 2.0;
      float contour = abs(fract(heightNorm / contourInterval) - 0.5);
      float line = 1.0 - smoothstep(0.0, contourWidth, contour);
      
      vec3 contourColor = vec3(1.0);
      finalColor = mix(finalColor, contourColor, line * 0.7);
    }
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface TerrainProps {
  config: TerrainConfig;
}

export function Terrain({ config }: TerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { geometry } = useTerrain(config);
  const showContours = useSceneStore((state) => state.showContours);
  const dayNightTime = useSceneStore((state) => state.dayNightTime);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uShowContours: { value: 0 },
      uDayTime: { value: 0.5 },
      uSunDirection: { value: new THREE.Vector3(1, 1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uShowContours.value = showContours ? 1 : 0;
      material.uniforms.uDayTime.value = dayNightTime;

      const sunAngle = dayNightTime * Math.PI * 2 - Math.PI / 2;
      const sunX = Math.cos(sunAngle);
      const sunY = 0.3;
      const sunZ = Math.sin(sunAngle);
      material.uniforms.uSunDirection.value.set(sunX, sunY, sunZ).normalize();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
