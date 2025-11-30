import { useAuth } from "@/context/global.context";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

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
      <Navbar />
      <h2>Hola, {user?.name}</h2>
      <h1>Esto es el Dashboard</h1>
      <Button onClick={logout} variant="contained">
        LOG OUT
      </Button>
    </>
  );
};
