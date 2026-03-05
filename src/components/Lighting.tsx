import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '@/store/sceneStore';
import { dayColors, sunsetColors, nightColors, lerpColor } from '@/utils/terrainColors';

export function Lighting() {
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const dayNightTime = useSceneStore((state) => state.dayNightTime);

  const sunPosition = useMemo(() => {
    const angle = dayNightTime * Math.PI * 2 - Math.PI / 2;
    return new THREE.Vector3(
      Math.cos(angle) * 100,
      Math.sin(angle) * 100,
      50
    );
  }, [dayNightTime]);

  const lightSettings = useMemo(() => {
    const time = dayNightTime;

    let skyColor: THREE.Color;
    let intensity: number;
    let ambientIntensity: number;

    if (time < 0.2) {
      const t = time / 0.2;
      skyColor = lerpColor(nightColors.sky, sunsetColors.horizon, t);
      intensity = lerpColor(new THREE.Color(0.1), new THREE.Color(1), t).r;
      ambientIntensity = 0.1 + t * 0.3;
    } else if (time < 0.35) {
      const t = (time - 0.2) / 0.15;
      skyColor = lerpColor(sunsetColors.horizon, dayColors.sky, t);
      intensity = 0.8 + t * 0.2;
      ambientIntensity = 0.4 + t * 0.2;
    } else if (time < 0.65) {
      skyColor = dayColors.sky.clone();
      intensity = 1;
      ambientIntensity = 0.6;
    } else if (time < 0.8) {
      const t = (time - 0.65) / 0.15;
      skyColor = lerpColor(dayColors.sky, sunsetColors.horizon, t);
      intensity = 1 - t * 0.2;
      ambientIntensity = 0.6 - t * 0.2;
    } else {
      const t = (time - 0.8) / 0.2;
      skyColor = lerpColor(sunsetColors.horizon, nightColors.sky, t);
      intensity = 0.8 - t * 0.7;
      ambientIntensity = 0.4 - t * 0.3;
    }

    return { skyColor, intensity, ambientIntensity };
  }, [dayNightTime]);

  useFrame(() => {
    if (directionalRef.current) {
      directionalRef.current.position.copy(sunPosition);
      directionalRef.current.intensity = lightSettings.intensity;
    }
  });

  return (
    <>
      <directionalLight
        ref={directionalRef}
        position={sunPosition}
        intensity={lightSettings.intensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <ambientLight intensity={lightSettings.ambientIntensity} />
      <hemisphereLight
        color={lightSettings.skyColor}
        groundColor="#3d2817"
        intensity={0.3}
      />
    </>
  );
}
