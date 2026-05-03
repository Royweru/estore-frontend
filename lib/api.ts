import axios, { AxiosHeaders } from "axios";

const DEFAULT_API_BASE = "http://localhost:8000/api/v1";

export const CLIENT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE;

export const SERVER_API_BASE_URL = process.env.API_BASE_URL || CLIENT_API_BASE_URL;

const CSRF_COOKIE_NAME = process.env.NEXT_PUBLIC_CSRF_COOKIE_NAME || "csrf_token";
const CSRF_HEADER_NAME = process.env.NEXT_PUBLIC_CSRF_HEADER_NAME || "X-CSRF-Token";

export const apiClient = axios.create({
  baseURL: CLIENT_API_BASE_URL,
  withCredentials: true,
});

function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  if (!cookie) {
    return null;
  }
  return decodeURIComponent(cookie.slice(name.length + 1));
}

const unsafeMethods = new Set(["post", "put", "patch", "delete"]);

apiClient.interceptors.request.use((config) => {
  const method = (config.method || "get").toLowerCase();
  if (!unsafeMethods.has(method)) {
    return config;
  }

  const csrfToken = readCookie(CSRF_COOKIE_NAME);
  if (!csrfToken) {
    return config;
  }

  const headers = new AxiosHeaders(config.headers);
  headers.set(CSRF_HEADER_NAME, csrfToken);
  config.headers = headers;
  return config;
});
