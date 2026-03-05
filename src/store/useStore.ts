import { create } from 'zustand';

interface AppState {
  isNight: boolean;
  showContours: boolean;
  sunPosition: [number, number, number];
  toggleNight: () => void;
  toggleContours: () => void;
  setSunPosition: (position: [number, number, number]) => void;
}

export const useStore = create<AppState>((set) => ({
  isNight: false,
  showContours: false,
  sunPosition: [10, 10, 10],
  toggleNight: () => set((state) => ({ isNight: !state.isNight })),
  toggleContours: () => set((state) => ({ showContours: !state.showContours })),
  setSunPosition: (position) => set({ sunPosition: position }),
}));
