import { create } from 'zustand';
import type { SceneState } from '@/types';

interface SceneStore extends SceneState {
  toggleContours: () => void;
  setDayNightTime: (time: number | ((prev: number) => number)) => void;
  toggleAutoCycle: () => void;
  setCycleSpeed: (speed: number) => void;
}

export const useSceneStore = create<SceneStore>((set) => ({
  showContours: false,
  dayNightTime: 0.25,
  isAutoCycle: true,
  cycleSpeed: 1,

  toggleContours: () => set((state) => ({ showContours: !state.showContours })),
  setDayNightTime: (time) =>
    set((state) => ({
      dayNightTime: typeof time === 'function' ? time(state.dayNightTime) : time,
    })),
  toggleAutoCycle: () => set((state) => ({ isAutoCycle: !state.isAutoCycle })),
  setCycleSpeed: (speed) => set({ cycleSpeed: speed }),
}));
