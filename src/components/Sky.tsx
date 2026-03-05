import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSceneStore } from '@/store/sceneStore';
import { dayColors, sunsetColors, nightColors, lerpColor } from '@/utils/terrainColors';

const vertexShader = `
  varying vec3 vWorldPosition;
  
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 uTopColor;
  uniform vec3 uBottomColor;
  uniform vec3 uSunColor;
  uniform vec3 uSunPosition;
  uniform float uSunIntensity;
  uniform float uStarIntensity;
  
  varying vec3 vWorldPosition;
  
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  
  void main() {
    vec3 direction = normalize(vWorldPosition);
    float t = direction.y * 0.5 + 0.5;
    
    vec3 skyColor = mix(uBottomColor, uTopColor, pow(t, 0.5));
    
    vec3 sunDir = normalize(uSunPosition);
    float sunDot = dot(direction, sunDir);
    float sunGlow = pow(max(sunDot, 0.0), 32.0);
    float sunDisc = smoothstep(0.995, 1.0, sunDot);
    
    skyColor += uSunColor * sunGlow * uSunIntensity * 0.5;
    skyColor += uSunColor * sunDisc * uSunIntensity;
    
    float stars = 0.0;
    if (uStarIntensity > 0.0) {
      vec2 starUv = direction.xz / (direction.y + 0.001) * 100.0;
      float star = hash(floor(starUv));
      if (star > 0.998 && direction.y > 0.0) {
        stars = (star - 0.998) * 500.0 * uStarIntensity;
      }
    }
    skyColor += vec3(stars);
    
    gl_FragColor = vec4(skyColor, 1.0);
  }
`;

export function Sky() {
  const meshRef = useRef<THREE.Mesh>(null);
  const dayNightTime = useSceneStore((state) => state.dayNightTime);

  const skySettings = useMemo(() => {
    const time = dayNightTime;

    let topColor: THREE.Color;
    let bottomColor: THREE.Color;
    let sunColor: THREE.Color;
    let sunIntensity: number;
    let starIntensity: number;

    if (time < 0.2) {
      const t = time / 0.2;
      topColor = lerpColor(nightColors.sky, sunsetColors.sky, t);
      bottomColor = lerpColor(nightColors.horizon, sunsetColors.horizon, t);
      sunColor = lerpColor(nightColors.moon, sunsetColors.sun, t);
      sunIntensity = t;
      starIntensity = 1 - t;
    } else if (time < 0.35) {
      const t = (time - 0.2) / 0.15;
      topColor = lerpColor(sunsetColors.sky, dayColors.sky, t);
      bottomColor = lerpColor(sunsetColors.horizon, dayColors.horizon, t);
      sunColor = lerpColor(sunsetColors.sun, dayColors.sun, t);
      sunIntensity = 1;
      starIntensity = 0;
    } else if (time < 0.65) {
      topColor = dayColors.sky.clone();
      bottomColor = dayColors.horizon.clone();
      sunColor = dayColors.sun.clone();
      sunIntensity = 1;
      starIntensity = 0;
    } else if (time < 0.8) {
      const t = (time - 0.65) / 0.15;
      topColor = lerpColor(dayColors.sky, sunsetColors.sky, t);
      bottomColor = lerpColor(dayColors.horizon, sunsetColors.horizon, t);
      sunColor = lerpColor(dayColors.sun, sunsetColors.sun, t);
      sunIntensity = 1;
      starIntensity = t * 0.5;
    } else {
      const t = (time - 0.8) / 0.2;
      topColor = lerpColor(sunsetColors.sky, nightColors.sky, t);
      bottomColor = lerpColor(sunsetColors.horizon, nightColors.horizon, t);
      sunColor = lerpColor(sunsetColors.sun, nightColors.moon, t);
      sunIntensity = 1 - t * 0.5;
      starIntensity = t;
    }

    return { topColor, bottomColor, sunColor, sunIntensity, starIntensity };
  }, [dayNightTime]);

  const sunPosition = useMemo(() => {
    const angle = dayNightTime * Math.PI * 2 - Math.PI / 2;
    return new THREE.Vector3(
      Math.cos(angle) * 100,
      Math.sin(angle) * 100,
      50
    );
  }, [dayNightTime]);

  const uniforms = useMemo(
    () => ({
      uTopColor: { value: new THREE.Color() },
      uBottomColor: { value: new THREE.Color() },
      uSunColor: { value: new THREE.Color() },
      uSunPosition: { value: new THREE.Vector3() },
      uSunIntensity: { value: 1 },
      uStarIntensity: { value: 0 },
    }),
    []
  );

  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTopColor.value.copy(skySettings.topColor);
      material.uniforms.uBottomColor.value.copy(skySettings.bottomColor);
      material.uniforms.uSunColor.value.copy(skySettings.sunColor);
      material.uniforms.uSunPosition.value.copy(sunPosition);
      material.uniforms.uSunIntensity.value = skySettings.sunIntensity;
      material.uniforms.uStarIntensity.value = skySettings.starIntensity;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[500, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
      />
    </mesh>
  );
}
