import { useCallback, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
  fetchData: (url: string, options: ApiOptions) => Promise<() => void>;
}

const apiUrl = "http://localhost:8080/api/v1";

interface ApiOptions {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: Record<string, unknown>;
  token: string;
}

export const useFetch = <T>(): Params<T> => {
  const [data, setData] = useState<Data<T>>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ErrorType>(null);
  
  const fetchData = useCallback(async (url: string, options: ApiOptions) => {
    const { method = "GET", body, token } = options;
    const controller = new AbortController();
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        throw new Error("Error en la peticion");
      }

      const jsonData: T = await response.json();
      setData(jsonData);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, []);

  return { data, loading, error, fetchData };
};

