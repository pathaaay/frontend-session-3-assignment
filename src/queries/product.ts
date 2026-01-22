import { useQuery } from "@tanstack/react-query";
import { getProductById, getProducts } from "../actions/product";
import { type ProductType } from "../lib/types";

export const fetchProducts = () =>
  useQuery<{ products: ProductType[] }>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

export const fetchProductById = (id: string) =>
  useQuery<ProductType>({
    queryKey: [`product-${id}`],
    queryFn: () => getProductById(id),
  });
