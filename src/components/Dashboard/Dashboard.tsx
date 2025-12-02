import { useAuth } from "@/context/global.context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { ProductList } from "../Product/ProductList";

export const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar />
      <ProductList />
    </>
  );
};
