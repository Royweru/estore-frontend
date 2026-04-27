import { Category, Product, ProductImage, Size, UserSession } from "@/types";

type ApiCategory = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
};

type ApiSize = {
  id: string;
  name: string;
  value: string;
  created_at?: string;
  updated_at?: string;
};

type ApiImage = {
  id: string;
  product_id?: string;
  url: string;
  created_at?: string;
  updated_at?: string;
};

type ApiProduct = {
  id: string;
  category_id?: string;
  size_id?: string;
  name: string;
  description: string;
  price: number;
  color?: string | null;
  is_featured: boolean;
  is_archived: boolean;
  created_at?: string;
  updated_at?: string;
  category?: ApiCategory;
  size: ApiSize;
  images: ApiImage[];
  inventory?: {
    id: string;
    quantity: number;
  };
  average_rating?: number;
};

type ApiUser = {
  id: string;
  email: string;
  full_name?: string | null;
  role: "customer" | "admin";
  is_active: boolean;
};

export const mapApiCategory = (item: ApiCategory): Category => ({
  id: item.id,
  name: item.name,
  createdAt: item.created_at,
  updatedAt: item.updated_at,
});

export const mapApiSize = (item: ApiSize): Size => ({
  id: item.id,
  name: item.name,
  value: item.value,
  createdAt: item.created_at,
  updatedAt: item.updated_at,
});

export const mapApiImage = (item: ApiImage): ProductImage => ({
  id: item.id,
  productId: item.product_id,
  url: item.url,
  createdAt: item.created_at,
  updatedAt: item.updated_at,
});

export const mapApiProduct = (item: ApiProduct): Product => ({
  id: item.id,
  name: item.name,
  price: Number(item.price),
  description: item.description,
  size: mapApiSize(item.size),
  category: item.category ? mapApiCategory(item.category) : undefined,
  color: item.color || "",
  images: (item.images || []).map(mapApiImage),
  updatedAt: item.updated_at,
  createdAt: item.created_at,
  isFeatured: item.is_featured,
  isArchived: item.is_archived,
});

export const mapApiUser = (item: ApiUser): UserSession => ({
  id: item.id,
  email: item.email,
  fullName: item.full_name,
  role: item.role,
  isActive: item.is_active,
});
