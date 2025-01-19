"use client";
import React from "react";
import * as Yup from "yup";
import Link from "next/link";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

// MATERIAL - UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Email from "@mui/icons-material/Email";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import InputAdornment from "@mui/material/InputAdornment";

// PROJECT IMPORTS
import FormInput from "@/components/UIComponents/FormInput";
import {
  AuthenticationBgBlueCircle,
  AuthenticationBgOrangeCircle,
  AuthenticationTitle,
  AuthenticationSubmitButton,
  AuthenticationOptionButton,
} from "./Authentication.styled";

// SERVICES
import { AuthServices } from "@/services/authuser/authuser.services";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
});

const ForgotPassword = () => {
  const router = useRouter();

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const initialValues = {
    email: "",
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
  const handleSubmitForm = async (values: { email: string }) => {
    try {
      const response = await AuthServices.forgotPasswordEmail(values.email);
      if (typeof response !== "string" && response.success) {
        toast.success("OTP sent to email");
        router.push(`/verify-otp?email=${values.email}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
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

      {/* Login Card */}
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
        <AuthenticationTitle variant="h4">Forgot Password</AuthenticationTitle>

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

        <AuthenticationSubmitButton
          type="submit"
          variant="contained"
          disabled={isSubmitting}
          fullWidth
        >
          Continue
        </AuthenticationSubmitButton>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={12}>
            <Link href="/">
              <AuthenticationOptionButton fullWidth>
                Back to Login
              </AuthenticationOptionButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
