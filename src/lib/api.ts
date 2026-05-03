import axios from "axios";
import type { Stock } from "@/types/stock";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  timeout: 15000,
});

export async function fetchTop10Stocks() {
  const response = await apiClient.get<Stock[]>("/api/scan");
  return response.data;
}
