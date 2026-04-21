import { apiClient } from "@/lib/api";
import { mapApiUser } from "@/lib/mappers";
import { UserSession } from "@/types";

export const getCurrentSession = async (): Promise<UserSession | null> => {
  try {
    const response = await apiClient.get("/auth/me");
    return mapApiUser(response.data);
  } catch {
    return null;
  }
};

export const loginWithPassword = async (email: string, password: string): Promise<UserSession> => {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
  });
  return mapApiUser(response.data.user);
};

export const registerWithPassword = async (
  email: string,
  password: string,
  fullName?: string
): Promise<UserSession> => {
  const response = await apiClient.post("/auth/register", {
    email,
    password,
    full_name: fullName,
  });
  return mapApiUser(response.data.user);
};

export const logoutSession = async (): Promise<void> => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    return;
  }
};
