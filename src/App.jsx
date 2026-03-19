import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import Terrain from './components/Terrain';
import Water from './components/Water';
import Lighting from './components/Lighting';
import UI from './components/UI';

function App() {
  const waterLevel = 0.2; 

  return (
    <>
      <div className="w-full h-full bg-black relative">
        <Canvas shadows camera={{ position: [0, 40, 80], fov: 45 }}>
          <OrbitControls 
            maxPolarAngle={Math.PI / 2 - 0.1} 
            enableDamping
            dampingFactor={0.05}
          />
          <Lighting />
          <Suspense fallback={null}>
            <Terrain waterLevel={waterLevel} />
            <Water waterLevel={waterLevel} amplitude={15} />
          </Suspense>
        </Canvas>
        <UI />
      </div>
      <Loader />
    </>
  );
}

export default App;
