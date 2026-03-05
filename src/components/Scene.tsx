import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import { Terrain } from './Terrain';
import { Water } from './Water';
import { Lighting } from './Lighting';
import { useStore } from '../store/useStore';
import { Suspense } from 'react';

const SceneContent = () => {
  const isNight = useStore((state) => state.isNight);
  const sunPosition = useStore((state) => state.sunPosition); // This needs to be updated by Lighting component or store

  return (
    <>
      <Lighting />
      <Sky 
        distance={450000} 
        sunPosition={isNight ? [0, -10, -100] : [100, 20, 100]} 
        inclination={0} 
        azimuth={0.25} 
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
        rayleigh={isNight ? 0.1 : 3}
        turbidity={10}
      />
      {isNight && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
      
      <Terrain />
      <Water />
      
      <OrbitControls 
        enablePan={false} 
        maxPolarAngle={Math.PI / 2 - 0.1} // Prevent going below ground
        minDistance={20}
        maxDistance={150}
      />
    </>
  );
};

export const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [50, 50, 50], fov: 45 }}>
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
};
