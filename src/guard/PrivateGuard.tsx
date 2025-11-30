import { useAuth } from "@/context/global.context";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateGuard = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
