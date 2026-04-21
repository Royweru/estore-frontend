import { Product } from "@/types";
import { Category, ProductImage, Size } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";
import { getCart, addCartItem, removeCartItem, clearCart } from "@/lib/cart-api";
import { mapApiProduct } from "@/lib/mappers";

interface CartStore {
  items: Product[];
  serverCartItemIds: Record<string, string>; // Maps productId to cartItemId
  isSynced: boolean;
  syncWithServer: () => Promise<void>;
  addItem: (data: Product) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  removeAll: () => Promise<void>;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      serverCartItemIds: {},
      isSynced: false,
      
      syncWithServer: async () => {
        try {
          // Attempt to get the server cart
          const serverCart = await getCart();
          const { items: localItems } = get();
          
          // Determine which local items are not on the server
          const serverProductIds = new Set(serverCart.items.map((item: any) => item.product_id));
          const itemsToPush = localItems.filter((item) => !serverProductIds.has(item.id));
          
          // Push missing local items to server
          for (const item of itemsToPush) {
            await addCartItem(item.id, 1);
          }
          
          // Re-fetch the server cart after pushing
          const finalServerCart = itemsToPush.length > 0 ? await getCart() : serverCart;
          
          // Rebuild local store based on server state
          const newItems: Product[] = [];
          const newServerCartItemIds: Record<string, string> = {};
          
          for (const serverItem of finalServerCart.items) {
            const mappedProduct = mapApiProduct(serverItem.product);
            newItems.push(mappedProduct);
            newServerCartItemIds[mappedProduct.id] = serverItem.id;
          }
          
          set({ 
            items: newItems, 
            serverCartItemIds: newServerCartItemIds,
            isSynced: true 
          });
        } catch (error) {
          // If we fail to sync (e.g. not logged in), we simply stay unsynced.
          set({ isSynced: false });
        }
      },

      addItem: async (data: Product) => {
        const { items, isSynced, serverCartItemIds } = get();
        const existingItem = items.find((item) => item.id === data.id);

        if (existingItem) {
          toast.error("Item already in cart!");
          return;
        }

        // Optimistic local update
        set({ items: [...items, data] });
        toast.success("Item successfully added!", { style: { background: "green", color: "white" } });

        if (isSynced) {
          try {
            const response = await addCartItem(data.id, 1);
            // Server responds with the updated cart. Let's find the new item's ID.
            const newServerItem = response.items.find((i: any) => i.product_id === data.id);
            if (newServerItem) {
              set({
                serverCartItemIds: {
                  ...serverCartItemIds,
                  [data.id]: newServerItem.id
                }
              });
            }
          } catch (error) {
            console.error("Failed to sync item to server", error);
          }
        }
      },

      removeItem: async (id: string) => {
        const { items, isSynced, serverCartItemIds } = get();
        
        // Optimistic local update
        set({ items: items.filter((item) => item.id !== id) });

        if (isSynced) {
          const cartItemId = serverCartItemIds[id];
          if (cartItemId) {
            try {
              await removeCartItem(cartItemId);
              
              const newServerCartItemIds = { ...serverCartItemIds };
              delete newServerCartItemIds[id];
              set({ serverCartItemIds: newServerCartItemIds });
            } catch (error) {
              console.error("Failed to remove item from server", error);
            }
          }
        }
      },

      removeAll: async () => {
        const { isSynced } = get();
        
        set({ items: [], serverCartItemIds: {} });
        toast.success("Cart cleared!");

        if (isSynced) {
          try {
            await clearCart();
          } catch (error) {
            console.error("Failed to clear server cart", error);
          }
        }
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
