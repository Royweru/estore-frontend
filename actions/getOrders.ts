import { apiClient } from "@/lib/api";
import { Order } from "@/types";

export const getOrders = async (page: number = 1, pageSize: number = 20): Promise<{ items: Order[], total: number, totalPages: number }> => {
  try {
    const response = await apiClient.get(`/orders?page=${page}&page_size=${pageSize}`);
    const data = response.data;
    
    return {
      items: data.items.map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        status: item.status,
        totalAmount: item.total_amount,
        currency: item.currency,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      total: data.total,
      totalPages: data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { items: [], total: 0, totalPages: 0 };
  }
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const response = await apiClient.get(`/orders/${orderId}`);
    const item = response.data;
    
    return {
      id: item.id,
      userId: item.user_id,
      status: item.status,
      totalAmount: item.total_amount,
      currency: item.currency,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      items: item.items?.map((orderItem: any) => ({
        id: orderItem.id,
        orderId: orderItem.order_id,
        productId: orderItem.product_id,
        quantity: orderItem.quantity,
        unitPrice: orderItem.unit_price,
      })),
    };
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    return null;
  }
};
