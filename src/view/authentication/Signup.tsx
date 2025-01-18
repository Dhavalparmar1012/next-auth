"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { useFormik } from "formik";

// MATERIAL - UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Email from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Theme } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";

// PROJECT IMPORTS
import FormInput from "@/components/UIComponents/FormInput";
import {
  AuthenticationBgBlueCircle,
  AuthenticationBgOrangeCircle,
  AuthenticationOptionButton,
  AuthenticationSubmitButton,
  AuthenticationTitle,
} from "./Authentication.styled";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const {
    errors,
    values,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmitForm(values);
    },
  });

  // Submit handler
  const handleSubmitForm = async (values: typeof initialValues) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: isSmallScreen ? "100%" : "auto",
      }}
    >
      {/* Background Circles */}
      <AuthenticationBgBlueCircle />
      <AuthenticationBgOrangeCircle />

      {/* Signup Card */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: isSmallScreen ? "100%" : 400,
          maxWidth: "100%",
          backgroundColor: "rgba(255,255,255,0.13)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.6)",
          padding: 4,
        }}
      >
        <AuthenticationTitle variant="h4">Sign up</AuthenticationTitle>

        <FormInput
          id="name"
          name="name"
          label="Name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name ? errors.name : undefined}
          InputLabelProps={{ style: { color: "#e5e5e5" } }}
          InputProps={{
            style: {
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "#fff",
            },
            endAdornment: (
              <InputAdornment position="end">
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
          }}
          variant="filled"
          sx={{ mb: 3 }}
          required
        />
        <FormInput
          type="email"
          id="email"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email ? errors.email : undefined}
          InputLabelProps={{ style: { color: "#e5e5e5" } }}
          InputProps={{
            style: {
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "#fff",
            },
            endAdornment: (
              <InputAdornment position="end">
                <Email color="primary" />
              </InputAdornment>
            ),
          }}
          variant="filled"
          sx={{ mb: 3 }}
          required
        />

        <FormInput
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          label="Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password ? errors.password : undefined}
          InputLabelProps={{ style: { color: "#e5e5e5" } }}
          InputProps={{
            style: {
              backgroundColor: "rgba(255,255,255,0.07)",
              color: "#fff",
            },
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ cursor: "pointer" }}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? (
                  <LockOpenIcon color="primary" />
                ) : (
                  <LockIcon color="primary" />
                )}
              </InputAdornment>
            ),
          }}
          variant="filled"
          sx={{ mb: 4 }}
          required
        />

        <AuthenticationSubmitButton
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
        >
          Sign up
        </AuthenticationSubmitButton>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Link href="/">
              <AuthenticationOptionButton
                fullWidth
                sx={{
                  backgroundColor: "rgba(255,255,255,0.27)",
                  color: "#eaf0fb",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.47)" },
                }}
              >
                Login
              </AuthenticationOptionButton>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Link href="/forgot-password">
              <AuthenticationOptionButton
                fullWidth
                sx={{
                  backgroundColor: "rgba(255,255,255,0.27)",
                  color: "#eaf0fb",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.47)" },
                }}
              >
                Forgot Password?
              </AuthenticationOptionButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Signup;
