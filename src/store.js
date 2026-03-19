import { create } from 'zustand';

const useStore = create((set) => ({
  isNight: false,
  toggleNight: () => set((state) => ({ isNight: !state.isNight })),
  showContours: false,
  toggleContours: () => set((state) => ({ showContours: !state.showContours })),
}));

export default useStore;
