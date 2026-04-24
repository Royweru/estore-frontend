import { SERVER_API_BASE_URL } from "@/lib/api";
import { mapApiCategory, mapApiProduct } from "@/lib/mappers";

export const GetCategories = async () => {
  try {
    const response = await fetch(`${SERVER_API_BASE_URL}/catalog/categories`, {
      cache: "force-cache",
      next: {
        revalidate: 120,
      },
    });

    if (!response.ok) {
      return [];
    }

    const categoriesPayload = await response.json();
    const categories = (categoriesPayload || []).map((item: any) => mapApiCategory(item));

    const categoriesWithPreviewProducts = await Promise.all(
      categories.map(async (category: any) => {
        try {
          const productsResponse = await fetch(
            `${SERVER_API_BASE_URL}/catalog/products?category_id=${category.id}&page_size=1&sort=newest`,
            {
              next: {
                revalidate: 120,
              },
            }
          );

          if (!productsResponse.ok) {
            return {
              ...category,
              products: [],
            };
          }

          const productsPayload = await productsResponse.json();
          return {
            ...category,
            products: (productsPayload.items || []).map((product: any) => mapApiProduct(product)),
          };
        } catch (_error) {
          return {
            ...category,
            products: [],
          };
        }
      })
    );

    return categoriesWithPreviewProducts;
  } catch (error) {
    console.error("There was an errior fetching categories" + error);
    return [];
  }
};
