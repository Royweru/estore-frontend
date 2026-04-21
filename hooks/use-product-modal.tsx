import { Product } from "@/types";
import { Category, ProductImage, Size } from "@/types";
import { create } from "zustand";

interface productModalStore {
  isOpen: boolean;
  onOpen: (
    data: Product & {
      category?: Category;
      images: ProductImage[];
      size: Size;
    }
  ) => void;
  onClose: () => void;
  data?:
    | (Product & {
        category?: Category;
        images: ProductImage[];
        size: Size;
      })
   ;
}

export const useProductModal = create<productModalStore>((set) => ({
  isOpen: false,
  onOpen: (
    data?: Product & {
      category?: Category;
      images: ProductImage[];
      size: Size;
    }
  ) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
  data: undefined,
}));
