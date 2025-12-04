import { Controller, type Control, type FieldError, type FieldValues, type Path } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
  inputWidth?: string;
}

export const CustomInput = <T extends FieldValues>({ name, control, label, type, error, inputWidth }: Props<T>) => {
  return (
    <Box sx={{ marginBottom: '1rem' }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            sx={{width: inputWidth ? inputWidth : '220px'}}
            size="small"
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
    </Box>
  );
};
