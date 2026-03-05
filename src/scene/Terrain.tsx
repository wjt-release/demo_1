import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { defaultTerrainParams, terrainHeight } from "@/scene/noise";

type TerrainProps = {
  seed: number;
  time01: number;
  showContours: boolean;
  contourDensity: number;
  contourStrength: number;
};

export default function Terrain({ seed, time01, showContours, contourDensity, contourStrength }: TerrainProps) {
  const matRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const geometry = useMemo(() => {
    const p = defaultTerrainParams;
    const geo = new THREE.PlaneGeometry(p.sizeX, p.sizeZ, 220, 170);
    geo.rotateX(-Math.PI / 2);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h = terrainHeight(x, z, seed, p);
      pos.setY(i, h);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    const normals = geo.attributes.normal as THREE.BufferAttribute;
    const colors = new Float32Array(pos.count * 3);

    const snowLine = p.heightScale * 0.62;
    const rockLine = p.heightScale * 0.18;

    const low = new THREE.Color("#2E3A2F");
    const mid = new THREE.Color("#5C6458");
    const rock = new THREE.Color("#7A7F86");
    const snow = new THREE.Color("#E9EEF5");

    for (let i = 0; i < pos.count; i++) {
      const h = pos.getY(i);
      const ny = normals.getY(i);
      const slope = 1 - Math.max(0, Math.min(1, ny));

      const t0 = THREE.MathUtils.smoothstep(h, -p.heightScale * 0.18, rockLine);
      const t1 = THREE.MathUtils.smoothstep(h, rockLine, snowLine);
      const t2 = THREE.MathUtils.smoothstep(h, snowLine, p.heightScale);

      const c = low.clone().lerp(mid, t0).lerp(rock, t1).lerp(snow, t2);
      const cliffDarken = THREE.MathUtils.lerp(1.0, 0.72, Math.min(1, slope * 1.2));
      c.multiplyScalar(cliffDarken);

      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.computeBoundingSphere();
    return geo;
  }, [seed]);

  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.94,
      metalness: 0.0,
      envMapIntensity: 0.35,
    });

    m.onBeforeCompile = (shader) => {
      shader.uniforms.uTime01 = { value: 0.33 };
      shader.uniforms.uContours = { value: 0.0 };
      shader.uniforms.uContourInterval = { value: 0.5 };
      shader.uniforms.uContourStrength = { value: 0.6 };

      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
varying vec3 vWorldPos;
varying vec3 vWorldNormal;`,
        )
        .replace(
          "#include <beginnormal_vertex>",
          `#include <beginnormal_vertex>
vWorldNormal = normalize(mat3(modelMatrix) * objectNormal);`,
        )
        .replace(
          "#include <begin_vertex>",
          `#include <begin_vertex>
vWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
        );

      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          `#include <common>
uniform float uTime01;
uniform float uContours;
uniform float uContourInterval;
uniform float uContourStrength;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;`,
        )
        .replace(
          "#include <dithering_fragment>",
          `
float s = clamp(sin(uTime01 * 6.2831853 - 1.2) * 0.5 + 0.5, 0.0, 1.0);
float dusk = smoothstep(0.0, 0.35, 1.0 - s);
vec3 warm = vec3(1.06, 1.01, 0.96);
vec3 cool = vec3(0.82, 0.90, 1.08);
vec3 tint = mix(cool, warm, s);
gl_FragColor.rgb *= tint;
gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * vec3(0.86, 0.90, 1.08), dusk * 0.35);

if (uContours > 0.5) {
  float interval = max(0.12, 1.55 / max(0.35, uContourInterval));
  float h = vWorldPos.y / interval;
  float f = abs(fract(h) - 0.5);
  float line = 1.0 - smoothstep(0.47, 0.5, f * 2.0);
  float faceUp = clamp(dot(normalize(vWorldNormal), vec3(0.0, 1.0, 0.0)), 0.0, 1.0);
  float fade = mix(0.75, 1.0, faceUp);
  vec3 ink = mix(vec3(0.06, 0.08, 0.10), vec3(0.85, 0.90, 0.98), s);
  gl_FragColor.rgb = mix(gl_FragColor.rgb, ink, line * uContourStrength * fade);
}

#include <dithering_fragment>`,
        );

      m.userData.shader = shader;
    };
    return m;
  }, []);

  useFrame((_, delta) => {
    const m = matRef.current;
    const shader = m?.userData?.shader as
      | {
          uniforms: Record<string, { value: unknown }>;
        }
      | undefined;
    if (!shader) return;

    const t = (shader.uniforms.uTime01.value as number) ?? 0.33;
    const c = (shader.uniforms.uContours.value as number) ?? 0.0;
    const d = (shader.uniforms.uContourInterval.value as number) ?? 3.2;
    const k = (shader.uniforms.uContourStrength.value as number) ?? 0.6;

    (shader.uniforms.uTime01.value as number) = THREE.MathUtils.damp(t, time01, 6.5, delta);
    (shader.uniforms.uContours.value as number) = THREE.MathUtils.damp(c, showContours ? 1.0 : 0.0, 10.5, delta);
    (shader.uniforms.uContourInterval.value as number) = THREE.MathUtils.damp(d, contourDensity, 10.0, delta);
    (shader.uniforms.uContourStrength.value as number) = THREE.MathUtils.damp(k, contourStrength, 10.0, delta);
  });

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <primitive object={material} ref={matRef} attach="material" />
    </mesh>
  );
}
