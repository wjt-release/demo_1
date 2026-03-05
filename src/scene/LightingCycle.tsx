import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type LightingCycleProps = {
  time01: number;
};

function sunParams(time01: number) {
  const a = time01 * Math.PI * 2;
  const elev = Math.sin(a - 1.2) * 0.78;
  const az = a * 0.6 + 0.8;

  const y = elev;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const x = Math.cos(az) * r;
  const z = Math.sin(az) * r;

  const daylight = THREE.MathUtils.clamp((Math.sin(a - 1.2) * 0.5 + 0.5) * 1.15 - 0.05, 0, 1);
  const sun = new THREE.Vector3(x, y, z).normalize();
  return { sun, daylight };
}

export default function LightingCycle({ time01 }: LightingCycleProps) {
  const sunRef = useRef<THREE.DirectionalLight | null>(null);
  const fillRef = useRef<THREE.HemisphereLight | null>(null);
  const target = useMemo(() => new THREE.Object3D(), []);
  const tRef = useRef(0.33);

  const colors = useMemo(() => {
    return {
      sunDay: new THREE.Color("#FFD6A3"),
      sunDusk: new THREE.Color("#FFB657"),
      moon: new THREE.Color("#9CB7FF"),
      hemiSkyDay: new THREE.Color("#A6D5FF"),
      hemiSkyNight: new THREE.Color("#26335A"),
      hemiGround: new THREE.Color("#0E141B"),
    };
  }, []);

  useEffect(() => {
    const s = sunRef.current;
    if (!s) return;
    s.target = target;
  }, [target]);

  useFrame((_, delta) => {
    const s = sunRef.current;
    const h = fillRef.current;
    if (!s || !h) return;

    tRef.current = THREE.MathUtils.damp(tRef.current, time01, 6.5, delta);
    const { sun, daylight } = sunParams(tRef.current);
    const elev = sun.y;
    const dusk = THREE.MathUtils.smoothstep(daylight, 0.0, 0.55) * (1.0 - daylight);
    const night = 1.0 - daylight;

    const sunColor = colors.sunDusk.clone().lerp(colors.sunDay, THREE.MathUtils.smoothstep(daylight, 0.15, 0.9));
    const moonColor = colors.moon.clone();
    const dirColor = sunColor.lerp(moonColor, night);

    const intensity = THREE.MathUtils.lerp(0.12, 3.2, daylight) + dusk * 0.55;
    s.color.copy(dirColor);
    s.intensity = intensity;

    const dist = 120;
    s.position.set(sun.x * dist, Math.max(10, sun.y * dist), sun.z * dist);
    target.position.set(0, 0, 0);
    target.updateMatrixWorld();

    const hemiSky = colors.hemiSkyNight.clone().lerp(colors.hemiSkyDay, daylight);
    h.color.copy(hemiSky);
    h.groundColor.copy(colors.hemiGround);
    h.intensity = THREE.MathUtils.lerp(0.28, 0.85, daylight);

    if (s.shadow) {
      s.shadow.bias = -0.00025;
      s.shadow.normalBias = 0.02;
      s.shadow.radius = 2;
    }
  });

  return (
    <>
      <hemisphereLight ref={fillRef} args={["#26335A", "#0E141B", 0.6]} />
      <primitive object={target} />
      <directionalLight
        ref={sunRef}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={260}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
    </>
  );
}
