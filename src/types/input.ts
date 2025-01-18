import { SxProps, Theme } from "@mui/material/styles";
import { TextFieldProps } from "@mui/material/TextField";

export interface FormInputProps {
  type?: string;
  size?: "small" | "medium";
  id: string;
  name: string;
  label?: string | React.ReactNode;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: boolean;
  helperText?: string;
  InputLabelProps?: TextFieldProps["InputLabelProps"];
  InputProps?: TextFieldProps["InputProps"];
  variant?: "outlined" | "filled" | "standard";
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}
