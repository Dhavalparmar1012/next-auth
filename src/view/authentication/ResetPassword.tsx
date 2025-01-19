"use client";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

// MATERIAL - UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
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
  CodeVerificationEmailSection,
} from "./Authentication.styled";

// SERVICES
import { AuthServices } from "@/services/authuser/authuser.services";

// Validation schema
const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  cPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), ""], "New password does not match"),
});

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [showPassword, setShowPassword] = useState(false);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const initialValues = {
    password: "",
    cPassword: "",
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
      const res = await AuthServices.resetPassword(email, values.password);

      if (typeof res !== "string" && res.success) {
        toast.success("Password reset successfully");
        router.push(`/`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    // Adding event listener to prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
      router.push("/login");
    };

    // Optional: Preventing the page from being unloaded (optional for extra safety)
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);
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

      {/* Verify otp Card */}
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
        <AuthenticationTitle variant="h4">
          Reset Your Password
        </AuthenticationTitle>

        <CodeVerificationEmailSection>
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Email:
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {email}
          </Typography>
        </CodeVerificationEmailSection>

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

        <FormInput
          type={showPassword ? "text" : "password"}
          id="cPassword"
          name="cPassword"
          label="Confirm Password"
          value={values.cPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.cPassword && Boolean(errors.cPassword)}
          helperText={touched.cPassword ? errors.cPassword : undefined}
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
          fullWidth
          type="submit"
          variant="contained"
          disabled={isSubmitting}
        >
          Submit
        </AuthenticationSubmitButton>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={12}>
            <Link href="/">
              <AuthenticationOptionButton fullWidth>
                Not received Code?
              </AuthenticationOptionButton>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ResetPassword;
