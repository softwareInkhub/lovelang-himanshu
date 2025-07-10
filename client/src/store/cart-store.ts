import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  total: number;
  addToCart: (product: Product, quantity: number, size?: string) => void;
  removeFromCart: (productId: number, size?: string) => void;
  updateQuantity: (productId: number, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      total: 0,

      addToCart: (product, quantity, size = 'default') => {
        const { items } = get();
        const existingItem = items.find(
          item => item.product.id === product.id && (item.size || 'default') === size
        );

        if (existingItem) {
          get().updateQuantity(product.id, size, existingItem.quantity + quantity);
        } else {
          const newItems = [...items, { product, quantity, size }];
          const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
          set({ items: newItems, total: newTotal });
        }
      },

      removeFromCart: (productId, size = 'default') => {
        const { items } = get();
        const newItems = items.filter(
          item => !(item.product.id === productId && (item.size || 'default') === size)
        );
        const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        set({ items: newItems, total: newTotal });
      },

      updateQuantity: (productId, size, quantity) => {
        const { items } = get();
        const newItems = items.map(item =>
          item.product.id === productId && (item.size || 'default') === size
            ? { ...item, quantity }
            : item
        );
        const newTotal = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        set({ items: newItems, total: newTotal });
      },

      clearCart: () => set({ items: [], total: 0 }),

      toggleDrawer: () => set(state => ({ isOpen: !state.isOpen }))
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items, total: state.total })
    }
  )
);
