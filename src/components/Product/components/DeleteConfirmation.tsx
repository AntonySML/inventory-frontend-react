import { useModalContext } from "@/components/Modal/context/modal.context";
import { Button, Grid, Typography } from "@mui/material";

interface DeleteConfirmationProps {
  productName: string;
  onConfirm: () => void;
}

export const DeleteConfirmation = ({
  productName,
  onConfirm,
}: DeleteConfirmationProps) => {
  const { setState } = useModalContext();

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
          <Typography sx={{ fontWeight: "bold" }}>ELIMINAR PRODUCTO</Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingTop: "1rem",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              flexDirection: "row",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                flexDirection: "row",
              }}
            >
              ¿Estás seguro de que deseas eliminar el producto{" "}
              <Typography
                sx={{ color: "#1976d2", fontWeight: "bold", paddingLeft: "0.25rem" }}
              >{`${productName}`}</Typography>?
            </Typography>
          </Grid>
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
            <Button
              onClick={onConfirm}
              variant="contained"
              sx={{ width: "50%" }}
            >
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
