import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '@/store/sceneStore';
import { smoothstep } from '@/utils/math';

interface RiverProps {
  width: number;
  height: number;
  segments: number;
}

const vertexShader = `
  varying vec2 vUv;
  varying float vHeight;
  
  void main() {
    vUv = uv;
    vHeight = position.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uDayTime;
  
  varying vec2 vUv;
  varying float vHeight;
  
  void main() {
    vec3 deepColor = vec3(0.1, 0.29, 0.37);
    vec3 shallowColor = vec3(0.18, 0.54, 0.54);
    vec3 foamColor = vec3(0.9, 0.95, 1.0);
    
    float wave = sin(vUv.x * 20.0 + uTime * 2.0) * 0.5 + 0.5;
    wave += sin(vUv.y * 15.0 + uTime * 1.5) * 0.3;
    
    float foam = smoothstep(0.6, 0.8, wave);
    
    vec3 waterColor = mix(deepColor, shallowColor, wave * 0.5 + 0.25);
    waterColor = mix(waterColor, foamColor, foam * 0.3);
    
    float dayFactor = smoothstep(0.2, 0.8, uDayTime);
    float nightFactor = 1.0 - dayFactor;
    
    vec3 nightTint = vec3(0.2, 0.2, 0.4);
    waterColor = mix(waterColor * nightTint, waterColor, dayFactor);
    
    float alpha = 0.85 + wave * 0.1;
    
    gl_FragColor = vec4(waterColor, alpha);
  }
`;

export function River({ width, height, segments }: RiverProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const dayNightTime = useSceneStore((state) => state.dayNightTime);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, segments, segments);
    const positions = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      
      const riverCenterX = width * 0.1;
      const riverWidth = 6;
      
      const distFromCenter = Math.abs(x - riverCenterX);
      const riverFactor = 1.0 - smoothstep(0, riverWidth, distFromCenter);
      
      if (riverFactor > 0) {
        positions[i + 2] = -0.5 + riverFactor * 0.3;
      } else {
        positions[i + 2] = -10;
      }
    }

    geo.computeVertexNormals();
    return geo;
  }, [width, height, segments]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDayTime: { value: 0.5 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uDayTime.value = dayNightTime;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
