import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import { Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';

export const Lighting = () => {
  const isNight = useStore((state) => state.isNight);
  const sunRef = useRef<THREE.DirectionalLight>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const skyRef = useRef<any>(null);
  const starsRef = useRef<any>(null);

  // Target values
  const dayColor = new THREE.Color('#fff0d9'); // Warm sun
  const nightColor = new THREE.Color('#2a4b7c'); // Cool moon
  const dayAmbient = 0.6;
  const nightAmbient = 0.15;
  const dayFog = new THREE.Color('#d9ecff'); // Blue sky fog
  const nightFog = new THREE.Color('#0b1026'); // Dark night fog

  // Current values for interpolation
  const currentSunPos = useRef(new THREE.Vector3(50, 50, 50));
  const targetSunPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const step = delta * 2; // Transition speed

    // Determine target position
    if (isNight) {
      targetSunPos.set(-50, 10, -50); // Moon position
    } else {
      targetSunPos.set(50, 50, 50); // Sun position
    }

    // Interpolate position
    currentSunPos.current.lerp(targetSunPos, step);

    if (sunRef.current) {
      // Update light position
      sunRef.current.position.copy(currentSunPos.current);
      
      // Lerp intensity
      sunRef.current.intensity = THREE.MathUtils.lerp(sunRef.current.intensity, isNight ? 0.2 : 1.5, step);
      
      // Lerp color
      sunRef.current.color.lerp(isNight ? nightColor : dayColor, step);
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, isNight ? nightAmbient : dayAmbient, step);
      ambientRef.current.color.lerp(isNight ? nightColor : dayColor, step);
    }

    // Update scene background/fog
    if (state.scene.fog) {
        if (!state.scene.background) state.scene.background = new THREE.Color();
        (state.scene.background as THREE.Color).lerp(isNight ? nightFog : dayFog, step);
        (state.scene.fog as THREE.FogExp2).color.lerp(isNight ? nightFog : dayFog, step);
    }

    // Update Sky
    if (skyRef.current) {
        // drei Sky uses a shader material. The uniform is usually 'sunPosition'.
        // We need to check if the material is exposed.
        // Sky renders a mesh.
        const material = skyRef.current.material;
        if (material && material.uniforms && material.uniforms.sunPosition) {
            material.uniforms.sunPosition.value.copy(currentSunPos.current);
        }
    }
    // Update Stars opacity
    if (starsRef.current) {
        const material = starsRef.current.material;
        if (material) {
            material.transparent = true;
            material.opacity = THREE.MathUtils.lerp(material.opacity, isNight ? 1 : 0, step);
            // Also need to set visible to false when opacity is near 0 to save draw calls?
            // material.visible = material.opacity > 0.01;
            starsRef.current.visible = material.opacity > 0.01;
        }
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.5} />
      <directionalLight
        ref={sunRef}
        position={[50, 50, 50]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      >
        <orthographicCamera attach="shadow-camera" args={[-100, 100, 100, -100]} />
      </directionalLight>
      
      <fogExp2 attach="fog" args={['#d9ecff', 0.02]} />
      
      <Sky 
        ref={skyRef}
        distance={450000} 
        sunPosition={currentSunPos.current}
        inclination={0} 
        azimuth={0.25} 
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
        rayleigh={isNight ? 0.1 : 3}
        turbidity={10}
      />
      
      <Stars 
        ref={starsRef}
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />
    </>
  );
};
