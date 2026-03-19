import { create } from "zustand";

export type QualityMode = "auto" | "high" | "low";

type SceneState = {
  time01: number;
  autoCycle: boolean;
  showContours: boolean;
  contourDensity: number;
  contourStrength: number;
  fogAmount: number;
  quality: QualityMode;
  seed: number;
  resetNonce: number;

  setTime01: (v: number) => void;
  setAutoCycle: (v: boolean) => void;
  setShowContours: (v: boolean) => void;
  setContourDensity: (v: number) => void;
  setContourStrength: (v: number) => void;
  setFogAmount: (v: number) => void;
  setQuality: (v: QualityMode) => void;
  reseed: () => void;
  resetView: () => void;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export const useSceneStore = create<SceneState>((set, get) => ({
  time01: 0.33,
  autoCycle: true,
  showContours: false,
  contourDensity: 3.2,
  contourStrength: 0.6,
  fogAmount: 0.55,
  quality: "auto",
  seed: 173_021,
  resetNonce: 0,

  setTime01: (v) => set({ time01: clamp01(v) }),
  setAutoCycle: (v) => set({ autoCycle: v }),
  setShowContours: (v) => set({ showContours: v }),
  setContourDensity: (v) => set({ contourDensity: Math.max(0.6, Math.min(8, v)) }),
  setContourStrength: (v) => set({ contourStrength: Math.max(0, Math.min(1, v)) }),
  setFogAmount: (v) => set({ fogAmount: Math.max(0, Math.min(1, v)) }),
  setQuality: (v) => set({ quality: v }),
  reseed: () => set({ seed: Math.floor(10_000 + Math.random() * 9_000_000) }),
  resetView: () => set({ resetNonce: get().resetNonce + 1 }),
}));

