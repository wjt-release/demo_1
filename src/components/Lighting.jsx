import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sky, Stars } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '../store';

const Lighting = () => {
  const isNight = useStore((state) => state.isNight);
  const dirLightRef = useRef();
  const ambientRef = useRef();
  
  // Animate sun position for Sky
  const [sunY, setSunY] = useState(20);
  
  useFrame((state, delta) => {
    // Lerp light intensity
    const targetIntensity = isNight ? 0.1 : 1.5;
    const targetAmbient = isNight ? 0.05 : 0.4;
    
    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, targetIntensity, delta * 2);
      
      // Update light color
      const dayColor = new THREE.Color("#fffdf0"); // Warm sun
      const nightColor = new THREE.Color("#b0c4de"); // Moon light
      dirLightRef.current.color.lerp(isNight ? nightColor : dayColor, delta * 2);
    }
    
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbient, delta * 2);
    }

    // Animate Sun Y for Sky component
    // Note: Updating state in useFrame can cause performance issues if not careful, 
    // but for a single value it's usually okay if we don't block.
    // Better to use a ref for the value and only trigger render if significant change?
    // Or just use a simple approach:
    const targetSunY = isNight ? -2 : 20;
    const diff = targetSunY - sunY;
    if (Math.abs(diff) > 0.1) {
       setSunY(current => THREE.MathUtils.lerp(current, targetSunY, 0.05));
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.4} />
      <directionalLight 
        ref={dirLightRef}
        position={[50, 50, 25]} 
        castShadow 
        shadow-bias={-0.0005}
        shadow-mapSize={[2048, 2048]}
      />
      <Sky 
        sunPosition={[100, sunY, 100]} 
        turbidity={8}
        rayleigh={isNight ? 0.5 : 3}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        inclination={0.49} // Set to 0 for sunrise/sunset
        azimuth={0.25} 
      />
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
        opacity={isNight ? 1 : 0} // Fade stars in/out? Stars component doesn't support opacity prop directly on group usually, but 'fade' prop handles distance.
        // We can wrap in a group and animate opacity if needed, but Stars usually look fine if Sky covers them.
      />
      {/* Fog for depth */}
      <fog attach="fog" args={[isNight ? '#050510' : '#d0e0f0', 10, 150]} /> 
    </>
  );
};

export default Lighting;
