"use client";
import React from "react";
import { Box } from "@mui/material";

interface LayoutProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#080710",
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default AuthWrapper;
