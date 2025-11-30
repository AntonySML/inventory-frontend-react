import "./Login.css";
import { useForm, type SubmitHandler } from "react-hook-form";
import { schema, type FormValues } from "./models";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "./components";
import { useAuth } from "@/context/global.context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";

export const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await login(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al iniciar sesión.";
      console.log(`${errorMessage}`);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container className="login-container">
      <div className="card-login">
        <AdbIcon sx={{ display: "flex" }} />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mb: 4,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            name="email"
            control={control}
            label="Email"
            type="text"
            error={errors.email}
          />
          <CustomInput
            name="password"
            control={control}
            label="Password"
            type="password"
            error={errors.password}
          />
          <Button variant="contained" className="submit-button" type="submit">
            LOGIN
          </Button>
        </form>
      </div>
    </Container>
  );
};
