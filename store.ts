import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  deleteCartProduct: (productId: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubTotalPrice: () => number;
  getItemCount: (productId: string) => number;
  getGroupedItem: () => CartItem[];
  favoriteProduct: Product[];
  addToFavorite: (product: Product) => Promise<void>;
  removeFromFavorite: (productId: string) => void;
  resetFavorite: () => void;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      items: [],
      favoriteProduct: [],

      addItem: (product) => {
        const existingItem = get().items.find(
          (i) => i.product._id === product._id
        );
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.product._id === product._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...get().items, { product, quantity: 1 }],
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get()
            .items.map((i) =>
              i.product._id === productId
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        });
      },

      deleteCartProduct: (productId) => {
        set({
          items: get().items.filter((i) => i.product._id !== productId),
        });
      },

      resetCart: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },

      getSubTotalPrice: () => {
        return get().items.reduce(
          (subtotal, item) => subtotal + (item.product.price ?? 0),
          0
        );
      },

      getItemCount: (productId) => {
        const item = get().items.find((i) => i.product._id === productId);
        return item ? item.quantity : 0;
      },

      getGroupedItem: () => {
        return get().items;
      },

      addToFavorite: async (product) => {
        const exists = get().favoriteProduct.some((p) => p._id === product._id);
        if (!exists) {
          set({
            favoriteProduct: [...get().favoriteProduct, product],
          });
        }
      },

      removeFromFavorite: (productId) => {
        set({
          favoriteProduct: get().favoriteProduct.filter(
            (p) => p._id !== productId
          ),
        });
      },

      resetFavorite: () => {
        set({ favoriteProduct: [] });
      },
    }),
    { name: "cart-store" }
  )
);
export default useStore;
