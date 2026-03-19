import React from 'react';
import * as THREE from 'three';

const Water = ({ width = 100, height = 100, waterLevel = 0.2, amplitude = 15 }) => {
  const y = (waterLevel * amplitude); 

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} receiveShadow>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color="#4fa1c2"
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Water;
