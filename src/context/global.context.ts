import { createContext, useContext } from "react";
import type { AuthState } from "../types/auth";

export const AuthContext = createContext<AuthState>({} as AuthState);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
