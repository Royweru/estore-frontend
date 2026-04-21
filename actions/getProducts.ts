import { SERVER_API_BASE_URL } from "@/lib/api";
import { mapApiProduct } from "@/lib/mappers";

interface Iparams {
  categoryId?: string;
  sizeId?: string;
  sort?: "newest" | "oldest" | "price_asc" | "price_desc";
  featured?: boolean;
}
export const GetProducts = async (Query: Iparams) => {
  try {
    const searchParams = new URLSearchParams();

    if (Query.categoryId) searchParams.set("category_id", Query.categoryId);
    if (Query.sizeId) searchParams.set("size_id", Query.sizeId);
    if (Query.sort) searchParams.set("sort", Query.sort);
    if (typeof Query.featured === "boolean") {
      searchParams.set("featured", String(Query.featured));
    }

    const response = await fetch(
      `${SERVER_API_BASE_URL}/catalog/products?${searchParams.toString()}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    const products = (payload.items || []).map((item: any) => mapApiProduct(item));
    return products;
  } catch (error) {
    console.log("Error fetching products" + error);
    return [];
  }
};
