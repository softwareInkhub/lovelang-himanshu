import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

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
      addToFavorites: (product) =>
        set((state) => ({
          favorites: [...state.favorites, product],
        })),
      removeFromFavorites: (productId) =>
        set((state) => ({
          favorites: state.favorites.filter((product) => product.id !== productId),
        })),
      isFavorite: (productId) => {
        const state = get();
        return state.favorites.some((product) => product.id === productId);
      },
      toggleFavorite: (product) => {
        const state = get();
        if (state.isFavorite(product.id)) {
          state.removeFromFavorites(product.id);
        } else {
          state.addToFavorites(product);
        }
      },
    }),
    {
      name: "lovelang-favorites",
    }
  )
);