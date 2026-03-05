import SceneCanvas from "@/scene/SceneCanvas";
import SceneHUD from "@/components/SceneHUD";

export default function Home() {
  return (
    <div className="relative h-dvh w-dvw overflow-hidden bg-[#0B0F16]">
      <SceneCanvas />
      <SceneHUD />
    </div>
  );
}
