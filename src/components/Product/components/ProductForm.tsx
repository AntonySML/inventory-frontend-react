import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { schemaProduct, type ProductFormValues } from "../models/product.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "@/components/CustomInput";
import { useModalContext } from "@/components/Modal/context/modal.context";
import Button from "@mui/material/Button";
import type { Product } from "../models/Product";
import { useEffect } from "react";

interface ProductFormProps {
  product?: Product;
  isEdit: boolean;
  onConfirm: (product: Product) => void;
}

export const ProductForm = ({ product, isEdit, onConfirm }: ProductFormProps) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(schemaProduct),
    mode: "onBlur",
    defaultValues: {
      name: "",
      description: "",
      price: "",
      quantity: "",
    },
  });

  useEffect(() => {
    if (isEdit && product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price.toString());
      setValue("quantity", product.quantity.toString());
    }
  }, [isEdit, product, setValue]);

  const { setState } = useModalContext();

  const onSubmit = (data: ProductFormValues) => {
    onConfirm({
      id: product ? product.id : 0,
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity, 10),
    });
    setState(false);
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: "1rem",
          minWidth: "300px",
          minHeight: "50px",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography sx={{ fontWeight: "bold" }}>{isEdit ? "MODIFICAR PRODUCTO" : "NUEVO PRODUCTO"}</Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "1rem",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              name="name"
              control={control}
              label="Name"
              type="text"
              error={errors.name}
              inputWidth="300px"
            />
            <CustomInput
              name="description"
              control={control}
              label="Description"
              type="text"
              error={errors.description}
              inputWidth="300px"
            />
            <CustomInput
              name="price"
              control={control}
              label="Price"
              type="text"
              error={errors.price}
              inputWidth="300px"
            />
            <CustomInput
              name="quantity"
              control={control}
              label="Quantity"
              type="text"
              error={errors.quantity}
              inputWidth="300px"
            />
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "2rem",
                gap: "1rem",
              }}
            >
              <Button
                onClick={() => setState(false)}
                variant="outlined"
                sx={{ width: "50%" }}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="contained" sx={{ width: "50%" }}>
                {isEdit ? "Modificar" : "Guardar"}
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
