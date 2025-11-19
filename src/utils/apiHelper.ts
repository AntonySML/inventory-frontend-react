/* eslint-disable @typescript-eslint/no-explicit-any */
const apiUrl = "http://localhost:8080/api/v1";

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Record<string, any>;
  token: string;
}

interface ApiError {
  message: string;
  [key: string]: any;
}

export const apiCall = async (endpoint: string, options: ApiOptions) => {
  const { method = 'GET', body, token } = options;

  if (!apiUrl) {
    throw new Error('Error de configuración: API_URL no definida.');
  }

  const response = await fetch(`${apiUrl}/${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseText = await response.text();
  let responseData: any = null;

  if (responseText) {
    try {
      responseData = JSON.parse(responseText);
    } catch (jsonError) {
      console.error("Error al parsear JSON:", jsonError, responseText);
      throw new Error("Respuesta inesperada del servidor (no JSON).");
    }
  }

  if (!response.ok) {
    const errorMessage = (responseData as ApiError)?.message || response.statusText || 'Error en la petición a la API.';
    throw new Error(errorMessage);
  }

  return responseData;
};