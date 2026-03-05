import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Terrain } from './Terrain';
import { River } from './River';
import { Lighting } from './Lighting';
import { Sky } from './Sky';
import { useSceneStore } from '@/store/sceneStore';
import { useFrame } from '@react-three/fiber';
import type { TerrainConfig } from '@/types';

const terrainConfig: TerrainConfig = {
  width: 100,
  height: 100,
  segments: 200,
  heightScale: 25,
  noiseScale: 0.015,
};

function DayNightCycle() {
  const { isAutoCycle, cycleSpeed, setDayNightTime } = useSceneStore();

  useFrame((_, delta) => {
    if (isAutoCycle) {
      setDayNightTime((prev) => (prev + delta * 0.01 * cycleSpeed) % 1);
    }
  });

  return null;
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[60, 50, 60]} fov={60} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={20}
        maxDistance={150}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={0.1}
      />

      <Sky />
      <Lighting />
      <Terrain config={terrainConfig} />
      <River
        width={terrainConfig.width}
        height={terrainConfig.height}
        segments={terrainConfig.segments}
      />
      <DayNightCycle />

      <fog attach="fog" args={['#87ceeb', 80, 200]} />
    </>
  );
}

export function Scene() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
