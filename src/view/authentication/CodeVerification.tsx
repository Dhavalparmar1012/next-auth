"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import OtpInput from "react18-input-otp";
import { useSearchParams } from "next/navigation";

// MATERIAL - UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

// PROJECT IMPORTS
import theme from "@/themes/theme";
import {
  AuthenticationBgBlueCircle,
  AuthenticationBgOrangeCircle,
  AuthenticationOptionButton,
  AuthenticationSubmitButton,
  AuthenticationTitle,
  CodeVerificationEmailSection,
} from "./Authentication.styled";

const CodeVerification = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(300);

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

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

        <AuthenticationSubmitButton fullWidth variant="contained">
          Submit
        </AuthenticationSubmitButton>

        <Grid container spacing={2} sx={{ mt: 3 }}>
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

export default CodeVerification;
