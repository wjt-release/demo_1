import { create } from 'zustand';

interface UIState {
  showWelcomeModal: boolean;
  showMobileMenu: boolean;
  showCartDrawer: boolean;
  closeWelcomeModal: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleCartDrawer: () => void;
  closeCartDrawer: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  showWelcomeModal: !localStorage.getItem('elegance-welcome-shown'),
  showMobileMenu: false,
  showCartDrawer: false,

  closeWelcomeModal: () => {
    localStorage.setItem('elegance-welcome-shown', 'true');
    set({ showWelcomeModal: false });
  },

  toggleMobileMenu: () => {
    set({ showMobileMenu: !get().showMobileMenu });
  },

  closeMobileMenu: () => {
    set({ showMobileMenu: false });
  },

  toggleCartDrawer: () => {
    set({ showCartDrawer: !get().showCartDrawer });
  },

  closeCartDrawer: () => {
    set({ showCartDrawer: false });
  },
}));
