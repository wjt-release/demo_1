import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useSceneStore } from "@/state/useSceneStore";
import LightingCycle from "@/scene/LightingCycle";
import PostFX from "@/scene/PostFX";
import River from "@/scene/River";
import SkyDome from "@/scene/SkyDome";
import Terrain from "@/scene/Terrain";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

function World() {
  const time01 = useSceneStore((s) => s.time01);
  const autoCycle = useSceneStore((s) => s.autoCycle);
  const setTime01 = useSceneStore((s) => s.setTime01);
  const showContours = useSceneStore((s) => s.showContours);
  const contourDensity = useSceneStore((s) => s.contourDensity);
  const contourStrength = useSceneStore((s) => s.contourStrength);
  const fogAmount = useSceneStore((s) => s.fogAmount);
  const seed = useSceneStore((s) => s.seed);
  const resetNonce = useSceneStore((s) => s.resetNonce);

  const fogRef = useRef<THREE.FogExp2 | null>(null);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const tRef = useRef(0.33);

  const fogColors = useMemo(() => {
    return {
      day: new THREE.Color("#9FC8FF"),
      dusk: new THREE.Color("#C38B7B"),
      night: new THREE.Color("#0B0F16"),
    };
  }, []);

  useEffect(() => {
    const c = controlsRef.current;
    if (!c) return;
    c.object.position.set(42, 26, 42);
    c.target.set(0, 3.4, 0);
    c.update();
  }, [resetNonce]);

  useFrame((_, delta) => {
    tRef.current = THREE.MathUtils.damp(tRef.current, time01, 6.5, delta);

    if (autoCycle) {
      const speed = 1 / 95;
      setTime01((time01 + delta * speed) % 1);
    }

    const s = THREE.MathUtils.clamp(Math.sin(tRef.current * Math.PI * 2 - 1.2) * 0.5 + 0.5, 0, 1);
    const dusk = THREE.MathUtils.smoothstep(s, 0.0, 0.55) * (1.0 - s);
    const col = fogColors.night.clone().lerp(fogColors.dusk, dusk).lerp(fogColors.day, s);
    const density = THREE.MathUtils.lerp(0.004, 0.018, fogAmount) * THREE.MathUtils.lerp(1.35, 0.8, s);

    const fog = fogRef.current;
    if (fog) {
      fog.color.lerp(col, 1 - Math.exp(-delta * 4.5));
      fog.density = THREE.MathUtils.damp(fog.density, density, 6.0, delta);
    }
  });

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={["#0B0F16", 0.01]} />
      <SkyDome time01={time01} />
      <LightingCycle time01={time01} />
      <group position={[0, -3.2, 0]}>
        <Terrain
          seed={seed}
          time01={time01}
          showContours={showContours}
          contourDensity={contourDensity}
          contourStrength={contourStrength}
        />
        <River seed={seed} time01={time01} />
      </group>
      <OrbitControls
        makeDefault
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.75}
        minDistance={18}
        maxDistance={96}
        minPolarAngle={Math.PI * 0.12}
        maxPolarAngle={Math.PI * 0.48}
        target={[0, 3.4, 0]}
      />
    </>
  );
}

export default function SceneCanvas() {
  const quality = useSceneStore((s) => s.quality);
  const [dpr, setDpr] = useState(() => {
    const base = Math.min(1.5, window.devicePixelRatio || 1);
    if (quality === "low") return 1;
    if (quality === "high") return base;
    return Math.min(1.35, base);
  });

  useEffect(() => {
    const base = Math.min(1.5, window.devicePixelRatio || 1);
    if (quality === "low") setDpr(1);
    else if (quality === "high") setDpr(base);
    else setDpr(Math.min(1.35, base));
  }, [quality]);

  const camera = useMemo(() => {
    return {
      fov: 48,
      near: 0.1,
      far: 600,
      position: [42, 26, 42] as [number, number, number],
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={dpr}
        camera={camera}
        gl={{
          antialias: quality !== "low",
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr((v) => Math.max(1, v - 0.15))}
          onIncline={() => setDpr((v) => Math.min(1.5, v + 0.1))}
        />
        <World />
        <PostFX />
      </Canvas>
    </div>
  );
}
