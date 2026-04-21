export type Category = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Size = {
  id: string;
  name: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductImage = {
  id: string;
  productId?: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  size: Size;
  category?: Category;
  color: string;
  images: ProductImage[];
  updatedAt?: string;
  createdAt?: string;
  isFeatured: boolean;
  isArchived: boolean;
};

export type UserSession = {
  id: string;
  email: string;
  fullName?: string | null;
  role: "customer" | "admin";
  isActive: boolean;
};

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  userId: string;
  status: string;
  totalAmount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
  items?: OrderItem[];
};
