import { createContext, useContext } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  key: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

export type StoreContextValue = {
  items: CartItem[];
  openCart: () => void;
  addItem: (product: Product, size: string, color: string) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  recentlyViewed: number[];
  markViewed: (id: number) => void;
};

export const StoreContext = createContext<StoreContextValue | null>(null);

export function useStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("Store unavailable");
  return store;
}
