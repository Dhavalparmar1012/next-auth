"use client";
import React, { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

// MATERIAL - UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// PROJECT IMPORTS
import theme from "@/themes/theme";
import {
  AuthenticationBgBlueCircle,
  AuthenticationBgOrangeCircle,
  AuthenticationSubmitButton,
  AuthenticationTitle,
  CodeVerificationEmailSection,
} from "./Authentication.styled";

// SERVICES
import { AuthServices } from "@/services/authuser/authuser.services";

const CodeVerification = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(300);
  const [isResending, setIsResending] = useState<boolean>(false);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const handleVerifyOtp = async () => {
    try {
      const res = await AuthServices.otpVerification(otp);

      if (typeof res !== "string" && res.success) {
        toast.success("OTP verified successfully");
        router.push(`/reset-password?email=${email}`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const res = await AuthServices.forgotPasswordEmail(email);

      if (typeof res !== "string" && res.success) {
        toast.success("OTP sent to email");
        setTimer(300);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
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
        <AuthenticationTitle variant="h4">Verify Your OTP</AuthenticationTitle>

        <CodeVerificationEmailSection>
          <Typography variant="body2" fontWeight={500} color="text.secondary">
            Email:
          </Typography>
          <Typography variant="body2" fontWeight={600} color="text.primary">
            {email}
          </Typography>
        </CodeVerificationEmailSection>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          containerStyle={{ justifyContent: "space-between" }}
          inputStyle={{
            width: "100%",
            margin: "8px",
            padding: "10px",
            border: `1px solid #008cba`,
            borderRadius: 4,
            ":hover": {
              borderColor: theme.palette.primary.main,
            },
          }}
          focusStyle={{
            outline: "none",
            boxShadow: "#008cba",
            border: `1px solid ${theme.palette.primary.main}`,
          }}
        />

        <AuthenticationSubmitButton
          fullWidth
          variant="contained"
          onClick={handleVerifyOtp}
        >
          Submit
        </AuthenticationSubmitButton>

        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={12}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Typography color="white">Not received Code?</Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "white",
                  minWidth: 85,
                  ml: 2,
                  textDecoration: "none",
                  cursor:
                    timer === 0 && !isResending ? "pointer" : "not-allowed",
                }}
                color={
                  isResending
                    ? "text.disabled"
                    : timer === 0
                    ? "primary"
                    : "text.disabled"
                }
                onClick={
                  timer === 0 && !isResending ? handleResendOtp : undefined
                }
              >
                {isResending
                  ? "Resending..."
                  : timer > 0
                  ? `Resend code in ${formatTime(timer)}`
                  : "Resend code"}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CodeVerification;
