import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface FavoritesState {
  items: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
  getItemCount: () => number;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      items: [],

      addFavorite: (product: Product) => {
        const items = get().items;
        if (!items.some(item => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },

      removeFavorite: (productId: string) => {
        set({
          items: get().items.filter(item => item.id !== productId),
        });
      },

      toggleFavorite: (product: Product) => {
        const isFav = get().isFavorite(product.id);
        if (isFav) {
          get().removeFavorite(product.id);
        } else {
          get().addFavorite(product);
        }
      },

      isFavorite: (productId: string) => {
        return get().items.some(item => item.id === productId);
      },

      clearFavorites: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'elegance-favorites',
    }
  )
);
