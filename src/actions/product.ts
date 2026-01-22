import { apiService } from "../lib/axios";
import type { ProductType } from "../lib/types";

export const getProducts = async () => {
  const res = await apiService.get("/products");
  return res.data;
};

export const getProductById = async (productId: string) => {
  const res = await apiService.get(`/products/${productId}`);
  return res.data;
};

export const createProduct = async (data: ProductType) => {
  const res = await apiService.post(`/products/add`, {
    data,
  });
  return res.data;
};
