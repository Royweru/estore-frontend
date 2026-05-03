import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";

import { addCartItem, clearCart, getCart, removeCartItem, updateCartItem, type ApiCart } from "@/lib/cart-api";
import { mergeCartLines } from "../lib/cart-merge.mjs";
import { mapApiProduct } from "@/lib/mappers";
import { type CartLine, type Product } from "@/types";

interface CartStore {
  items: CartLine[];
  serverCartItemIds: Record<string, string>;
  isSynced: boolean;
  syncWithServer: () => Promise<void>;
  addItem: (product: Product) => Promise<void>;
  incrementItem: (productId: string) => Promise<void>;
  decrementItem: (productId: string) => Promise<void>;
  setItemQuantity: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  removeAll: () => Promise<void>;
}

function _stateFromServerCart(serverCart: ApiCart): {
  items: CartLine[];
  serverCartItemIds: Record<string, string>;
} {
  const items: CartLine[] = [];
  const serverCartItemIds: Record<string, string> = {};

  for (const serverItem of serverCart.items) {
    const product = mapApiProduct(serverItem.product as any);
    items.push({ product, quantity: serverItem.quantity });
    serverCartItemIds[product.id] = serverItem.id;
  }

  return { items, serverCartItemIds };
}

function _migratePersistedItems(raw: unknown): CartLine[] {
  if (!Array.isArray(raw)) {
    return [];
  }

  const migrated: CartLine[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") {
      continue;
    }

    const entry = item as { product?: unknown; quantity?: unknown; id?: unknown };
    if (entry.product && typeof entry.product === "object" && typeof entry.quantity === "number") {
      migrated.push({
        product: entry.product as Product,
        quantity: Math.max(1, Math.floor(entry.quantity)),
      });
      continue;
    }

    if (entry.id && typeof entry.id === "string") {
      migrated.push({
        product: item as Product,
        quantity: 1,
      });
    }
  }

  return migrated;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => {
      const applyServerCart = (serverCart: ApiCart) => {
        const nextState = _stateFromServerCart(serverCart);
        set({
          items: nextState.items,
          serverCartItemIds: nextState.serverCartItemIds,
          isSynced: true,
        });
      };

      return {
        items: [],
        serverCartItemIds: {},
        isSynced: false,

        syncWithServer: async () => {
          try {
            const serverCart = await getCart();
            const localItems = get().items;
            const serverByProduct = new Map(serverCart.items.map((item) => [item.product_id, item]));
            const mergedLines = mergeCartLines(localItems, serverCart.items);
            let changed = false;

            for (const line of mergedLines) {
              const serverLine = serverByProduct.get(line.product.id);
              if (!serverLine) {
                await addCartItem(line.product.id, line.quantity);
                changed = true;
                continue;
              }
              const mergedQuantity = Math.max(serverLine.quantity, line.quantity);
              if (mergedQuantity !== serverLine.quantity) {
                await updateCartItem(serverLine.id, mergedQuantity);
                changed = true;
              }
            }

            const finalServerCart = changed ? await getCart() : serverCart;
            applyServerCart(finalServerCart);
          } catch {
            set({ isSynced: false });
          }
        },

        addItem: async (product: Product) => {
          const previousItems = get().items;
          const existing = previousItems.find((line) => line.product.id === product.id);
          const nextQuantity = (existing?.quantity ?? 0) + 1;

          const nextItems = existing
            ? previousItems.map((line) =>
                line.product.id === product.id ? { ...line, quantity: nextQuantity } : line
              )
            : [...previousItems, { product, quantity: 1 }];

          set({ items: nextItems });

          if (!existing) {
            toast.success("Item added to cart.", { style: { background: "green", color: "white" } });
          } else {
            toast.success("Item quantity updated.", { style: { background: "green", color: "white" } });
          }

          if (!get().isSynced) {
            return;
          }

          try {
            const cartItemId = get().serverCartItemIds[product.id];
            const serverCart = cartItemId
              ? await updateCartItem(cartItemId, nextQuantity)
              : await addCartItem(product.id, nextQuantity);
            applyServerCart(serverCart);
          } catch {
            set({ items: previousItems });
            toast.error("Failed to sync cart item.");
          }
        },

        incrementItem: async (productId: string) => {
          const line = get().items.find((item) => item.product.id === productId);
          if (!line) {
            return;
          }
          await get().setItemQuantity(productId, line.quantity + 1);
        },

        decrementItem: async (productId: string) => {
          const line = get().items.find((item) => item.product.id === productId);
          if (!line) {
            return;
          }
          if (line.quantity <= 1) {
            await get().removeItem(productId);
            return;
          }
          await get().setItemQuantity(productId, line.quantity - 1);
        },

        setItemQuantity: async (productId: string, quantity: number) => {
          if (quantity <= 0) {
            await get().removeItem(productId);
            return;
          }

          const previousItems = get().items;
          const line = previousItems.find((item) => item.product.id === productId);
          if (!line) {
            return;
          }

          const normalizedQuantity = Math.max(1, Math.floor(quantity));
          const nextItems = previousItems.map((item) =>
            item.product.id === productId ? { ...item, quantity: normalizedQuantity } : item
          );
          set({ items: nextItems });

          if (!get().isSynced) {
            return;
          }

          const cartItemId = get().serverCartItemIds[productId];
          try {
            const serverCart = cartItemId
              ? await updateCartItem(cartItemId, normalizedQuantity)
              : await addCartItem(productId, normalizedQuantity);
            applyServerCart(serverCart);
          } catch {
            set({ items: previousItems });
            toast.error("Failed to sync cart quantity.");
          }
        },

        removeItem: async (productId: string) => {
          const previousItems = get().items;
          const nextItems = previousItems.filter((line) => line.product.id !== productId);
          set({ items: nextItems });

          if (!get().isSynced) {
            return;
          }

          const cartItemId = get().serverCartItemIds[productId];
          if (!cartItemId) {
            return;
          }

          try {
            const serverCart = await removeCartItem(cartItemId);
            applyServerCart(serverCart);
          } catch {
            set({ items: previousItems });
            toast.error("Failed to sync cart removal.");
          }
        },

        removeAll: async () => {
          const previousItems = get().items;
          set({ items: [], serverCartItemIds: {} });
          toast.success("Cart cleared!");

          if (!get().isSynced) {
            return;
          }

          try {
            const serverCart = await clearCart();
            applyServerCart(serverCart);
          } catch {
            set({ items: previousItems });
            toast.error("Failed to clear cart on server.");
          }
        },
      };
    },
    {
      name: "cart-storage",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState) => {
        const state = (persistedState ?? {}) as {
          items?: unknown;
          serverCartItemIds?: Record<string, string>;
          isSynced?: boolean;
        };
        return {
          ...(state as Partial<CartStore>),
          items: _migratePersistedItems(state.items),
          serverCartItemIds: state.serverCartItemIds ?? {},
          isSynced: Boolean(state.isSynced),
        } as CartStore;
      },
    }
  )
);
