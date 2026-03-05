import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, DoubleSide, ShaderMaterial, Vector3 } from 'three';
import { createNoise2D } from 'simplex-noise';
import { useStore } from '../store/useStore';

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    vElevation = position.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uColorWaterDeep;
  uniform vec3 uColorWaterSurface;
  uniform vec3 uColorSand;
  uniform vec3 uColorGrass;
  uniform vec3 uColorSnow;
  uniform vec3 uColorRock;
  uniform float uColorOffset;
  uniform float uColorMultiplier;
  uniform bool uShowContours;

  varying float vElevation;
  varying vec3 vPosition;

  void main() {
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uColorSand, uColorGrass, smoothstep(0.0, 0.2, vElevation));
    color = mix(color, uColorRock, smoothstep(0.5, 0.7, vElevation));
    color = mix(color, uColorSnow, smoothstep(0.8, 1.0, vElevation));

    // Cliffs/Steepness could be calculated via derivatives or normal y-component, but simple height gradient is fine for now.

    // Contour lines
    if (uShowContours) {
      float contour = fract(vElevation * 10.0);
      if (contour < 0.05) {
        color = mix(color, vec3(1.0), 0.5);
      }
    }

    // Simple lighting/shading based on normal (approximate)
    // Actually, Three.js lights won't affect ShaderMaterial unless we implement lighting logic.
    // For simplicity, we can use MeshStandardMaterial with vertex colors or custom shader with light uniforms.
    // But let's stick to unlit aesthetic or fake lighting.
    
    // Fake directional light
    // We don't have normals here unless we compute them.
    // Let's just output color for now.
    
    gl_FragColor = vec4(color, 1.0);
    
    // Add some fog
    #include <fog_fragment>
  }
`;

// However, standard materials are better for lighting. 
// Let's use MeshStandardMaterial and modify it via onBeforeCompile, or use a custom shader that includes lighting chunks.
// For "realistic gradients", a custom shader is good.
// But for day/night cycle with shadows, MeshStandardMaterial is best.
// I will use MeshStandardMaterial and use a texture or vertex colors for the gradient.

export const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const showContours = useStore((state) => state.showContours);

  const { geometry, colors } = useMemo(() => {
    const noise2D = createNoise2D();
    const width = 100;
    const depth = 100;
    const segments = 256;
    
    // Create geometry manually or modify plane
    // Let's use PlaneGeometry and modify vertices
    const geom = new THREE.PlaneGeometry(width, depth, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const posAttribute = geom.attributes.position;
    const count = posAttribute.count;
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = posAttribute.getX(i);
      const z = posAttribute.getZ(i);
      
      // Terrain generation logic
      // Base noise
      let y = noise2D(x * 0.02, z * 0.02) * 5;
      // Detail noise
      y += noise2D(x * 0.1, z * 0.1) * 1;
      // River channel (simple sine wave distortion)
      const riverPath = Math.sin(x * 0.05) * 20;
      const distToRiver = Math.abs(z - riverPath);
      
      // Create river bed
      if (distToRiver < 5) {
        y -= (5 - distToRiver) * 2; // Dig down
        if (y < -2) y = -2; // Flatten bottom
      }
      
      // Cliffs (steepen the slope)
      // Use power function to exaggerate height
      if (y > 2) {
        y = Math.pow(y, 1.2);
      }

      posAttribute.setY(i, y);

      // Vertex Colors based on height
      const color = new Color();
      if (y < -1.5) color.set('#2a4b7c'); // Deep water/River bed
      else if (y < 0) color.set('#d4b483'); // Sand/Bank
      else if (y < 4) color.set('#567d46'); // Grass
      else if (y < 10) color.set('#5a4d41'); // Rock
      else color.set('#ffffff'); // Snow

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geom.computeVertexNormals();
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return { geometry: geom, colors };
  }, []);

  // Shader material for contours
  // Or use MeshStandardMaterial with onBeforeCompile to inject contour logic.
  // This allows us to keep standard lighting.
  
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
        // Update uniforms if any
        if (materialRef.current.userData.shader) {
            materialRef.current.userData.shader.uniforms.uShowContours.value = showContours;
            materialRef.current.userData.shader.uniforms.uTime.value = state.clock.elapsedTime;
        }
    }
  });

  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uShowContours = { value: showContours };
    shader.uniforms.uTime = { value: 0 };
    
    // Add uniform declaration
    shader.vertexShader = `
      varying float vElevation;
      varying vec3 vPos;
      ${shader.vertexShader}
    `.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      vElevation = position.y;
      vPos = position;
      `
    );

    shader.fragmentShader = `
      uniform bool uShowContours;
      uniform float uTime;
      varying float vElevation;
      varying vec3 vPos;
      ${shader.fragmentShader}
    `.replace(
      '#include <dithering_fragment>',
      `
      #include <dithering_fragment>
      
      if (uShowContours) {
        float contour = fract(vElevation * 0.5);
        float width = 0.05; // Contour line width
        if (contour < width) {
            gl_FragColor = mix(gl_FragColor, vec4(1.0, 1.0, 1.0, 1.0), 0.5);
        }
      }
      `
    );
    
    materialRef.current!.userData.shader = shader;
  };

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
      <meshStandardMaterial
        ref={materialRef}
        vertexColors
        roughness={0.8}
        metalness={0.1}
        onBeforeCompile={onBeforeCompile}
        side={DoubleSide}
      />
    </mesh>
  );
};

import * as THREE from 'three';
