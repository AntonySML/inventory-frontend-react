import { useProducts } from "@/hooks";
import { CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import { DataTable, type HeadCell } from "../DataTable/DataTable";
import type { Product } from "@/types/Product";
import { useEffect } from "react";

const productHeadCells: HeadCell<Product>[] = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Producto' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Descripción' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Precio ($)' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Inventario' },
];

export const ProductList = () => {
  const { products, error, loading, fetchData } = useProducts();

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  if (loading) {
    return <CircularProgress size="30px" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Container fixed sx={{ paddingBottom: "2rem" }}>
        <DataTable<Product>
            rows={products || []}
            headCells={productHeadCells} 
            title="Inventario de Productos"
            initialOrderBy="name"
        />
      </Container>
    </>
  );
};
