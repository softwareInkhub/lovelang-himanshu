import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface FavoritesState {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addToFavorites: (product) => {
        set((state) => ({
          favorites: [...state.favorites, product]
        }));
      },
      
      removeFromFavorites: (productId) => {
        set((state) => ({
          favorites: state.favorites.filter(item => item.id !== productId)
        }));
      },
      
      isFavorite: (productId) => {
        return get().favorites.some(item => item.id === productId);
      },
      
      toggleFavorite: (product) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        if (isFavorite(product.id)) {
          removeFromFavorites(product.id);
        } else {
          addToFavorites(product);
        }
      }
    }),
    {
      name: 'favorites-storage',
    }
  )
);