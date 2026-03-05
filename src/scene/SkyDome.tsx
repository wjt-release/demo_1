import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SkyDomeProps = {
  time01: number;
};

function sunDirection(time01: number) {
  const a = time01 * Math.PI * 2;
  const elev = Math.sin(a - 1.2) * 0.75;
  const az = a * 0.6 + 0.8;
  const y = elev;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const x = Math.cos(az) * r;
  const z = Math.sin(az) * r;
  return new THREE.Vector3(x, y, z).normalize();
}

export default function SkyDome({ time01 }: SkyDomeProps) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        uTime01: { value: 0.33 },
        uSunDir: { value: new THREE.Vector3(0.2, 0.6, -0.1) },
      },
      vertexShader: `
varying vec3 vWorldDir;
void main() {
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldDir = normalize(wp.xyz - cameraPosition);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
      `.trim(),
      fragmentShader: `
uniform float uTime01;
uniform vec3 uSunDir;
varying vec3 vWorldDir;

float hash12(vec2 p) {
  float h = dot(p, vec2(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

void main() {
  vec3 d = normalize(vWorldDir);
  float up = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
  float sun = clamp(dot(d, normalize(uSunDir)), 0.0, 1.0);
  float s = clamp(sin(uTime01 * 6.2831853 - 1.2) * 0.5 + 0.5, 0.0, 1.0);
  float night = 1.0 - s;

  vec3 nightTop = vec3(0.02, 0.04, 0.08);
  vec3 nightHorizon = vec3(0.03, 0.05, 0.10);
  vec3 dayTop = vec3(0.20, 0.52, 0.85);
  vec3 dayHorizon = vec3(0.95, 0.62, 0.32);

  vec3 colDay = mix(dayHorizon, dayTop, smoothstep(0.0, 1.0, pow(up, 1.45)));
  vec3 colNight = mix(nightHorizon, nightTop, smoothstep(0.0, 1.0, pow(up, 1.25)));
  vec3 col = mix(colNight, colDay, s);

  float glow = pow(sun, 18.0) * mix(0.55, 1.15, s);
  vec3 glowC = mix(vec3(0.45, 0.60, 0.92), vec3(1.00, 0.78, 0.42), s);
  col += glowC * glow;

  float haze = smoothstep(0.0, 0.35, 1.0 - up);
  col = mix(col, col * vec3(1.05, 0.95, 0.90), haze * s * 0.55);
  col = mix(col, col * vec3(0.78, 0.88, 1.12), haze * night * 0.45);

  vec2 sp = d.xz * 150.0 + vec2(31.2, 9.7);
  float starSeed = hash12(floor(sp));
  float star = smoothstep(0.995, 1.0, starSeed) * (1.0 - haze);
  star *= pow(up, 1.5) * night;
  col += vec3(0.90, 0.95, 1.0) * star * 1.2;

  gl_FragColor = vec4(col, 1.0);
}
      `.trim(),
    });
  }, []);

  const geometry = useMemo(() => new THREE.SphereGeometry(260, 48, 32), []);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime01.value = THREE.MathUtils.damp(m.uniforms.uTime01.value, time01, 6.5, delta);

    const target = sunDirection(time01);
    const v = m.uniforms.uSunDir.value as THREE.Vector3;
    const a = 1 - Math.exp(-delta * 7);
    v.lerp(target, a).normalize();
  });

  return (
    <mesh geometry={geometry} frustumCulled={false} renderOrder={-10}>
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}
