import type { Product } from "@/types/Product";
import { useFetch } from "./useFetch";

export const useProducts = () => {
  const { data, error, loading, fetchData } = useFetch<Product[]>("products", {
    token: localStorage.getItem("token") || "",
  });

  return {
    products: data,
    error,
    loading,
    fetchData
  };
};
