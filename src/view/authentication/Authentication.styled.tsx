// MATERIAL - UI
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

// PROJECT IMPORTS
import theme from "@/themes/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const CodeVerificationEmailSection = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(0.62),
  backgroundColor: "#e3f2fd",
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  borderRadius: theme.spacing(2.5),
  marginBottom: theme.spacing(3),
}));

export const AuthenticationBgBlueCircle = styled(Box)(() => ({
  position: "absolute",
  width: 150,
  height: 150,
  borderRadius: "50%",
  background: "linear-gradient(#1845ad, #23a2f6)",
  top: -50,
  left: -50,
}));

export const AuthenticationBgOrangeCircle = styled(Box)(() => ({
  position: "absolute",
  width: 150,
  height: 150,
  borderRadius: "50%",
  background: "linear-gradient(to right, #ff512f, #f09819)",
  bottom: -50,
  right: -20,
}));

export const AuthenticationTitle = styled(Typography)(() => ({
  textAlign: "center",
  color: "#fff",
  marginBottom: theme.spacing(3),
}));

export const AuthenticationSubmitButton = styled(Button)(() => ({
  backgroundColor: "#fff",
  color: "#080710",
  fontWeight: 600,
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  "&:hover": { backgroundColor: "#f1f1f1" },
}));

export const AuthenticationOptionButton = styled(Button)(() => ({
  backgroundColor: "rgba(255,255,255,0.27)",
  color: "#eaf0fb",
  "&:hover": { backgroundColor: "rgba(255,255,255,0.47)" },
}));
