import { create } from 'zustand';
import { DeliveryMerchant, DeliveryProduct, DeliveryReview } from '@/types';

export interface DeliveryFilters {
  rating: number | null;
  deliveryTime: number | null;
  area: string | null;
}

interface DeliveryState {
  merchants: DeliveryMerchant[];
  currentMerchant: DeliveryMerchant | null;
  merchantProducts: DeliveryProduct[];
  merchantReviews: DeliveryReview[];
  filters: DeliveryFilters;
  selectedCategory: string | null;
  setMerchants: (merchants: DeliveryMerchant[]) => void;
  setCurrentMerchant: (merchant: DeliveryMerchant | null) => void;
  setMerchantProducts: (products: DeliveryProduct[]) => void;
  setMerchantReviews: (reviews: DeliveryReview[]) => void;
  setFilters: (filters: Partial<DeliveryFilters>) => void;
  resetFilters: () => void;
  setSelectedCategory: (category: string | null) => void;
}

const defaultFilters: DeliveryFilters = {
  rating: null,
  deliveryTime: null,
  area: null,
};

export const useDeliveryStore = create<DeliveryState>((set) => ({
  merchants: [],
  currentMerchant: null,
  merchantProducts: [],
  merchantReviews: [],
  filters: defaultFilters,
  selectedCategory: null,

  setMerchants: (merchants) => set({ merchants }),
  
  setCurrentMerchant: (merchant) => set({ currentMerchant: merchant }),
  
  setMerchantProducts: (products) => set({ merchantProducts: products }),
  
  setMerchantReviews: (reviews) => set({ merchantReviews: reviews }),
  
  setFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters },
  })),
  
  resetFilters: () => set({ filters: defaultFilters }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
