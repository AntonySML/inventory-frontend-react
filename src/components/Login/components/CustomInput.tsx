import { Controller, type Control, type FieldError } from "react-hook-form";
import "./CustomInput.css";
import type { FormValues } from "../models";
import TextField from "@mui/material/TextField";

interface Props {
  name: keyof FormValues;
  control: Control<FormValues>;
  label: string;
  type?: string;
  error?: FieldError;
}

export const CustomInput = ({ name, control, label, type, error }: Props) => {
  return (
    <div className="form-group">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            id={name}
            label={label}
            type={type}
            variant="outlined"
            error={!!error}
            helperText= {error ? error.message : ''}
            {...field}
          />
        )}
      />
    </div>
  );
};
