import type { Product } from "@/components/Product";
import { useAuth } from "@/context/global.context";
import { useFetch } from "@/hooks/useFetch";
import { useCallback, useEffect } from "react";

export const useProducts = () => {
  const { token, isAuthenticated, logout } = useAuth();
  const { data, error, loading, fetchData } = useFetch<Product[]>();

  const listProducts = useCallback(async () => {
    if (isAuthenticated && token) {
      await fetchData("products", { token, method: "GET" });
    } else {
      logout();
    }
  }, [fetchData, isAuthenticated, token, logout]);

  const createProduct = useCallback(
    async (product: Omit<Product, "id">) => {
      if (token) {
        await fetchData("products", { method: "POST", body: product, token });
        await listProducts();
    }
    },
    [fetchData, token, listProducts]
  );

  const updateProduct = useCallback(
    async (id: number, product: Partial<Product>) => {
      if (token) {
        await fetchData(`products/${id}`, {
          method: "PUT",
          body: product,
          token,
        });
        await listProducts();
      }
    },
    [fetchData, token, listProducts]
  );

  useEffect(() => {
    listProducts();
  }, [listProducts]);

  const deleteProduct = useCallback(
    async (id: number) => {
      if (token) {
        await fetchData(`products/${id}`, { method: "DELETE", token });
        await listProducts();
      }
    },
    [fetchData, token, listProducts]
  );

  return {
    products: data,
    error,
    loading,
    listProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
