import { BrowserRouter, Navigate, Route } from "react-router-dom";
import { PrivateRouter, RoutesWithNotFound } from "@/routes";
import { Login } from "@/components";
import { PrivateGuard } from "@/guard/PrivateGuard";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RoutesWithNotFound>
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateGuard />}>
            <Route path="/home/*" element={<PrivateRouter />} />
        </Route>
      </RoutesWithNotFound>
    </BrowserRouter>
  );
};