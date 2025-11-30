import { useAuth } from "@/context/global.context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <h2>Hola, {user?.name}</h2>
      <h1>Esto es el Dashboard</h1>
      <button onClick={logout}>LOG OUT</button>
    </>
  );
};
