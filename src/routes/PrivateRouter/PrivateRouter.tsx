import { Navigate, Route } from "react-router-dom";
import { Dashboard } from "@/components";
import { RoutesWithNotFound } from "@/routes/RoutesWithNotFound/RoutesWithNotFound";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={"/dashboard"} />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </RoutesWithNotFound>
  );
};