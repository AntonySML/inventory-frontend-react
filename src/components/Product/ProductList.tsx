import { DeleteConfirmation, ProductForm, useProducts } from "@/components/Product";
import { Box, CircularProgress } from "@mui/material";
import Container from "@mui/material/Container";
import { DataTable, type HeadCell } from "../DataTable/DataTable";
import type { Product } from "@/components/Product/models/Product";
import Button from "@mui/material/Button";
import { useModalContext } from "../Modal/context/modal.context";
import { CustomModal } from "@/components";
import { useState } from "react";

const productHeadCells: HeadCell<Product>[] = [
  { id: "name", numeric: false, disablePadding: false, label: "Producto" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Descripción",
  },
  { id: "price", numeric: true, disablePadding: false, label: "Precio ($)" },
  { id: "quantity", numeric: true, disablePadding: false, label: "Inventario" },
];

export const ProductList = () => {
  const { products, error, loading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [ product, setProduct ] = useState<Product>({} as Product);
  const { setState } = useModalContext()
  const [ isEdit, setIsEdit ] = useState<boolean>(false);
  const [ isDelete, setIsDelete ] = useState<boolean>(false);

  if (loading) {
    return (
      <Container
        fixed
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="60px" />;
      </Container>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleOpenModal = () => {
    setState(true);
    setIsEdit(false);
    setProduct({} as Product);
    setIsDelete(false);
  }

  const showEditProduct = ( product: Product ) => {
    setProduct(product);
    setState(true);
    setIsEdit(true);
    setIsDelete(false);
  }

  const showDeleteProduct = ( product: Product ) => {
    setProduct(product);
    setState(true);
    setIsDelete(true);
    setIsEdit(false);
  }

  const handleDeleteProduct = () => {
    deleteProduct(product.id);
    setState(false);
  }

  const handleProductFormConfirm = (product: Product) => {
    console.log("Product form confirmed:", product);
    if (isEdit) {
      updateProduct(product.id, product);
    } else {
      createProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
      });
    }
  }

  return (
    <>
      <Container fixed>
        <CustomModal>
          {isDelete ? (
            <DeleteConfirmation
              productName={product.name}
              onConfirm={handleDeleteProduct}
            />
          ) : (
            <ProductForm product={product} isEdit={isEdit} onConfirm={handleProductFormConfirm} />
          )}
        </CustomModal>
        <Box sx={{ paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleOpenModal} variant="contained">NUEVO PRODUCTO</Button>
        </Box>
        <Box sx={{ paddingBottom: '3rem' }}>
          <DataTable<Product>
            rows={products || []}
            headCells={productHeadCells}
            title="INVENTARIO DE PRODUCTOS"
            initialOrderBy="name"
            withEdit={true}
            withDelete={true}
            editAction={showEditProduct}
            deleteAction={showDeleteProduct}
          />
        </Box>
      </Container>
    </>
  );
};
