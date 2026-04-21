import axios from "axios";

const DEFAULT_API_BASE = "http://localhost:8000/api/v1";

export const CLIENT_API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_BASE;

export const SERVER_API_BASE_URL = process.env.API_BASE_URL || CLIENT_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: CLIENT_API_BASE_URL,
  withCredentials: true,
});
