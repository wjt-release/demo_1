import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import useStore from '../store';

// Simple seeded random number generator
function alea(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const Terrain = ({ 
  width = 100, 
  height = 100, 
  widthSegments = 256, 
  heightSegments = 256,
  seed = 42,
  waterLevel = 0.2
}) => {
  const showContours = useStore(state => state.showContours);
  const materialRef = useRef();
  const amplitude = 15;

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
    const pos = geo.attributes.position;
    const noise2D = createNoise2D(alea(seed));
    
    const scale = 0.02;
    const octaves = 6;
    const persistence = 0.5;
    const lacunarity = 2.0;
    const warpScale = 0.05;
    const warpAmp = 5;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      const qx = noise2D(x * warpScale, y * warpScale) * warpAmp;
      const qy = noise2D((x + 5.2) * warpScale, (y + 1.3) * warpScale) * warpAmp;

      let elevation = 0;
      let amp = amplitude;
      let freq = scale;

      for (let o = 0; o < octaves; o++) {
        const n = noise2D((x + qx) * freq, (y + qy) * freq);
        elevation += n * amp;
        amp *= persistence;
        freq *= lacunarity;
      }
      
      pos.setZ(i, elevation);
    }

    geo.computeVertexNormals();
    return geo;
  }, [width, height, widthSegments, heightSegments, seed, amplitude]);

  useEffect(() => {
    if (materialRef.current && materialRef.current.userData.shader) {
      materialRef.current.userData.shader.uniforms.uShowContours.value = showContours ? 1 : 0;
    }
  }, [showContours]);

  const onBeforeCompile = (shader) => {
    materialRef.current.userData.shader = shader;
    shader.uniforms.uShowContours = { value: showContours ? 1 : 0 };
    shader.uniforms.uWaterLevel = { value: waterLevel * amplitude };

    shader.vertexShader = `
      varying float vHeight;
      varying vec3 vPos;
      ${shader.vertexShader}
    `.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      vHeight = position.z;
      vPos = position;
      `
    );

    shader.fragmentShader = `
      uniform float uShowContours;
      uniform float uWaterLevel;
      varying float vHeight;
      varying vec3 vPos;
      ${shader.fragmentShader}
    `.replace(
      '#include <color_fragment>',
      `
      #include <color_fragment>
      
      // Colors
      vec3 grassColor = vec3(0.15, 0.45, 0.2);
      vec3 rockColor = vec3(0.35, 0.32, 0.3);
      vec3 snowColor = vec3(0.95, 0.95, 0.98);
      vec3 sandColor = vec3(0.86, 0.8, 0.6);
      
      // Slope calculation (using derivatives)
      vec3 dx = dFdx(vPos);
      vec3 dy = dFdy(vPos);
      vec3 n = normalize(cross(dx, dy));
      float slope = 1.0 - abs(dot(n, vec3(0.0, 0.0, 1.0)));
      
      // Base color
      vec3 col = grassColor;
      
      // Sand near water
      float sandLimit = uWaterLevel + 1.5;
      float sandMix = smoothstep(sandLimit - 1.0, sandLimit, vHeight);
      col = mix(sandColor, col, sandMix);
      
      // Rock based on slope and noise
      float rockMix = smoothstep(0.25, 0.5, slope);
      col = mix(col, rockColor, rockMix);
      
      // Snow at peaks
      float snowLimit = 8.0;
      float snowMix = smoothstep(snowLimit, snowLimit + 4.0, vHeight);
      col = mix(col, snowColor, snowMix);
      
      diffuseColor.rgb = col;
      
      // Contours
      if (uShowContours > 0.5) {
        float interval = 2.0;
        float dist = fract(vHeight / interval);
        float w = fwidth(vHeight / interval) * 1.5;
        float lineIntensity = smoothstep(w, 0.0, dist) + smoothstep(1.0 - w, 1.0, dist);
        
        diffuseColor.rgb = mix(diffuseColor.rgb, vec3(1.0, 1.0, 0.0), lineIntensity * 0.7);
      }
      `
    );
  };

  return (
    <mesh 
      geometry={geometry} 
      rotation={[-Math.PI / 2, 0, 0]} 
      receiveShadow 
      castShadow
    >
      <meshStandardMaterial 
        ref={materialRef}
        onBeforeCompile={onBeforeCompile}
        flatShading={false}
        roughness={0.8}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Terrain;
