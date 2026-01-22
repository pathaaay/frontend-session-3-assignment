import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../actions/product";
import { type ProductType } from "../lib/types";

export const fetchProducts = () =>
  useQuery<{ products: ProductType[] }>({
    queryKey: ["products"],
    queryFn: getProducts,
  });
