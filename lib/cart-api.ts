import { apiClient } from "./api";

export const getCart = async () => {
  const response = await apiClient.get("/cart");
  return response.data;
};

export const addCartItem = async (productId: string, quantity: number = 1) => {
  const response = await apiClient.post("/cart/items", {
    product_id: productId,
    quantity,
  });
  return response.data;
};

export const updateCartItem = async (itemId: string, quantity: number) => {
  const response = await apiClient.patch(`/cart/items/${itemId}`, {
    quantity,
  });
  return response.data;
};

export const removeCartItem = async (itemId: string) => {
  const response = await apiClient.delete(`/cart/items/${itemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await apiClient.delete("/cart");
  return response.data;
};
