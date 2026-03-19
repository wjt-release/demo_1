import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { defaultTerrainParams, riverCenterZ01, terrainHeight } from "@/scene/noise";

type RiverProps = {
  seed: number;
  time01: number;
};

export default function River({ seed, time01 }: RiverProps) {
  const matRef = useRef<THREE.ShaderMaterial | null>(null);

  const geometry = useMemo(() => {
    const p = defaultTerrainParams;
    const samples = 240;
    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    const up = new THREE.Vector3(0, 1, 0);
    const center = new THREE.Vector3();
    const prev = new THREE.Vector3();
    const next = new THREE.Vector3();
    const tangent = new THREE.Vector3();
    const side = new THREE.Vector3();

    function pointAt(t: number, out: THREE.Vector3) {
      const x = (t - 0.5) * p.sizeX;
      const z01 = riverCenterZ01(t, seed);
      const z = (z01 - 0.5) * p.sizeZ;
      const y = terrainHeight(x, z, seed, p) + 0.22;
      out.set(x, y, z);
      return out;
    }

    for (let i = 0; i < samples; i++) {
      const t = i / (samples - 1);
      pointAt(t, center);
      pointAt(Math.max(0, (i - 1) / (samples - 1)), prev);
      pointAt(Math.min(1, (i + 1) / (samples - 1)), next);

      tangent.copy(next).sub(prev).normalize();
      side.copy(up).cross(tangent).normalize();

      const wBase = 0.85 + Math.sin(t * 7.2 + 1.1) * 0.18;
      const wNoise = (Math.sin(t * 19.0 + seed * 0.0012) * 0.5 + 0.5) * 0.26;
      const width = (wBase + wNoise) * 1.35;

      const left = center.clone().addScaledVector(side, width);
      const right = center.clone().addScaledVector(side, -width);

      positions.push(left.x, left.y, left.z);
      positions.push(right.x, right.y, right.z);

      uvs.push(t, 0);
      uvs.push(t, 1);
    }

    for (let i = 0; i < samples - 1; i++) {
      const a = i * 2;
      const b = a + 1;
      const c = a + 2;
      const d = a + 3;
      indices.push(a, b, c, b, d, c);
    }

    const geo = new THREE.BufferGeometry();
    geo.setIndex(indices);
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.computeVertexNormals();
    geo.computeBoundingSphere();
    return geo;
  }, [seed]);

  const material = useMemo(() => {
    const m = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uTime01: { value: 0.33 },
      },
      vertexShader: `
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
void main() {
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vWorldPos = wp.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  gl_Position = projectionMatrix * viewMatrix * wp;
}
      `.trim(),
      fragmentShader: `
uniform float uTime;
uniform float uTime01;
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;

float hash12(vec2 p) {
  float h = dot(p, vec2(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash12(i + vec2(0.0, 0.0));
  float b = hash12(i + vec2(1.0, 0.0));
  float c = hash12(i + vec2(0.0, 1.0));
  float d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
  float s = clamp(sin(uTime01 * 6.2831853 - 1.2) * 0.5 + 0.5, 0.0, 1.0);
  vec3 dayC = vec3(0.18, 0.74, 0.95);
  vec3 nightC = vec3(0.07, 0.14, 0.22);
  vec3 base = mix(nightC, dayC, s);

  float flow = vUv.x * 7.0 - uTime * 0.55;
  float bands = sin(flow * 6.2831853) * 0.5 + 0.5;
  float n = noise(vec2(vUv.x * 18.0, vUv.y * 5.0 + uTime * 0.35));
  float shimmer = smoothstep(0.55, 0.98, bands * 0.65 + n * 0.55);

  vec3 N = normalize(vWorldNormal);
  vec3 V = normalize(cameraPosition - vWorldPos);
  float fres = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 3.0);

  vec3 c = base;
  c += vec3(0.35, 0.42, 0.48) * shimmer * 0.45;
  c += vec3(0.55, 0.75, 0.85) * fres * 0.25;

  float edge = smoothstep(0.02, 0.22, min(vUv.y, 1.0 - vUv.y));
  float alpha = mix(0.35, 0.92, edge);
  alpha *= mix(0.72, 1.0, s);

  gl_FragColor = vec4(c, alpha);
}
      `.trim(),
    });
    return m;
  }, []);

  useFrame(({ clock }, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = clock.getElapsedTime();
    m.uniforms.uTime01.value = THREE.MathUtils.damp(m.uniforms.uTime01.value, time01, 6.5, delta);
  });

  return (
    <mesh geometry={geometry} frustumCulled={false} renderOrder={2}>
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}
