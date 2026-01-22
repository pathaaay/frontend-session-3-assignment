import { apiService } from "../lib/axios";

export const getProducts = async () => {
  const res = await apiService.get("/products");
  return res.data;
};
