import { useForm, type SubmitHandler } from "react-hook-form";
import { schema, type FormValues } from "./models";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "./components";
import "./Login.css";
import { useAuth } from "@/context/global.context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    if(isAuthenticated){
        navigate("/home/dashboard");
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="card-login">
      <h2>LOGIN</h2>
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
        <button className="submit-button" type="submit">
          LOGIN
        </button>
      </form>
    </div>
  );
};
