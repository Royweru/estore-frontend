import { apiClient } from "@/lib/api";

export type PaymentStatus = "pending" | "successful" | "failed";

export type ApiCartItem = {
  id: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product: unknown;
};

export type ApiCart = {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  items: ApiCartItem[];
  total_amount: number;
};

export type ApiCheckoutInitializeResponse = {
  order_id: string;
  payment_reference: string;
  authorization_url: string;
  access_code: string | null;
  amount: number;
  currency: string;
};

export type ApiPaymentOut = {
  id: string;
  order_id: string;
  reference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  authorization_url: string | null;
  created_at: string;
  updated_at: string;
};

export async function getCart(): Promise<ApiCart> {
  const response = await apiClient.get<ApiCart>("/cart");
  return response.data;
}

export async function addCartItem(productId: string, quantity = 1): Promise<ApiCart> {
  const response = await apiClient.post<ApiCart>("/cart/items", {
    product_id: productId,
    quantity,
  });
  return response.data;
}

export async function updateCartItem(itemId: string, quantity: number): Promise<ApiCart> {
  const response = await apiClient.patch<ApiCart>(`/cart/items/${itemId}`, {
    quantity,
  });
  return response.data;
}

export async function removeCartItem(itemId: string): Promise<ApiCart> {
  const response = await apiClient.delete<ApiCart>(`/cart/items/${itemId}`);
  return response.data;
}

export async function clearCart(): Promise<ApiCart> {
  const response = await apiClient.delete<ApiCart>("/cart");
  return response.data;
}

export async function initializeCheckout(): Promise<ApiCheckoutInitializeResponse> {
  const response = await apiClient.post<ApiCheckoutInitializeResponse>("/checkout/initialize");
  return response.data;
}

export async function getPaymentByReference(reference: string): Promise<ApiPaymentOut> {
  const response = await apiClient.get<ApiPaymentOut>(`/payments/${encodeURIComponent(reference)}`);
  return response.data;
}
