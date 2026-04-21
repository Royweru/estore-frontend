import { cookies } from "next/headers";

import { SERVER_API_BASE_URL } from "@/lib/api";

export const isAdmin = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return false;
  }

  try {
    const response = await fetch(`${SERVER_API_BASE_URL}/auth/me`, {
      headers: {
        cookie: `access_token=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return false;
    }

    const payload = await response.json();
    return payload.role === "admin";
  } catch {
    return false;
  }
};
