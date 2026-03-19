import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useMemo } from "react";
import { useSceneStore } from "@/state/useSceneStore";

export default function PostFX() {
  const quality = useSceneStore((s) => s.quality);

  const multisampling = useMemo(() => {
    if (quality === "high") return 4;
    if (quality === "low") return 0;
    return 0;
  }, [quality]);

  if (quality === "low") return null;

  return (
    <EffectComposer multisampling={multisampling}>
      <Bloom intensity={0.28} luminanceThreshold={0.42} luminanceSmoothing={0.12} mipmapBlur />
      <Vignette eskil={false} offset={0.22} darkness={0.62} />
      <Noise opacity={0.02} />
    </EffectComposer>
  );
}

