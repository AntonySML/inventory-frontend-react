import { useEffect, useState } from "react";
import type {
  AuthRequest,
  JwtPayload,
  LoginResponse,
  UserDTO,
} from "../types/auth";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./global.context";

const apiUrl = "http://localhost:8080/api/v1";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      const tokenStorage = localStorage.getItem("token");
    if(tokenStorage){
        try {
            const decodedToken = jwtDecode<JwtPayload>(tokenStorage);
            
            const currentTime = Date.now() / 1000;
            
            if(decodedToken.exp < currentTime){
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                return;
            }
            
            setToken(tokenStorage);
            setUser({
              id: decodedToken.id,
              name: decodedToken.name,
              email: decodedToken.sub,
            });
            setIsAuthenticated(true);
            
        } catch (e) {
            console.error("Error al decodificar el token, será eliminado.", e);
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    } else {
        setIsLoading(false);
    }
    }
    loadToken();
  }, []);

  const login = async (authRequest: AuthRequest) => {
    if (!apiUrl) {
      throw new Error("Error de configuración: API_URL no definida.");
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: authRequest.email,
          password: authRequest.password,
        }),
      });

      const data: LoginResponse = await response.json();
      if (!response.ok) {
        throw new Error("Credenciales inválidas.");
      }

      if (data.token) {
        const decodedToken = jwtDecode<JwtPayload>(data.token);
        setToken(data.token);
        setUser({
          id: decodedToken.id,
          name: decodedToken.name,
          email: decodedToken.sub,
        });
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
      } else {
        throw new Error("No se recibió un token del servidor.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "No se pudo conectar al servidor.";
        console.error("Error al cargar parámetros:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setToken(null);
      setUser(null);
      localStorage.clear();
      setIsAuthenticated(false);
    } catch (e) {
      console.error("Error al eliminar el token:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
