import { Scene } from '@/components/Scene';
import { ControlPanel } from '@/components/ControlPanel';

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Scene />
      <ControlPanel />
      
      <div className="fixed top-6 left-6 z-50">
        <div className="bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
          <h1 className="text-white/90 text-lg font-medium tracking-wide">
            3D 山脉地形
          </h1>
          <p className="text-white/50 text-xs mt-1">
            拖动旋转 · 滚轮缩放 · 右键平移
          </p>
        </div>
      </div>
    </main>
  );
}
