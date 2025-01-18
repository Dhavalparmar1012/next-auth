"use client";
import React from "react";

// MUI-MATERIAL IMPORT
import { TextField, Typography } from "@mui/material";

// TYPES
import { FormInputProps } from "@/types/input";

const FormInput = ({
  type = "text",
  size = "small",
  id,
  name,
  label,
  fullWidth = true,
  multiline = false,
  rows,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  InputProps,
  InputLabelProps,
  variant = "outlined",
  required = false,
  disabled = false,
  sx,
  ...props
}: FormInputProps) => (
  <TextField
    type={type}
    size={size}
    id={id}
    name={name}
    label={
      typeof label === "string" ? (
        <Typography>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </Typography>
      ) : (
        label
      )
    }
    fullWidth={fullWidth}
    multiline={multiline}
    rows={rows}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    helperText={helperText}
    InputProps={InputProps}
    InputLabelProps={InputLabelProps}
    variant={variant}
    disabled={disabled}
    sx={sx}
    {...props}
  />
);

export default FormInput;
