"use client";
import { ReactElement } from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";

// MATERIAL - UI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";

// PROJECT IMPORTS
import "./globals.css";
import theme from "@/themes/theme";
import createEmotionCache from "@/themes/createEmotion";
import { ToastContainer } from "react-toastify";
import ScrollTop from "@/layout/ScrolllTop";

const clientSideEmotionCache = createEmotionCache();

type RootLayoutProps = {
  children: ReactElement;
  emotionCache?: EmotionCache;
};

const ProviderWrapper = ({
  children,
  emotionCache = clientSideEmotionCache,
}: RootLayoutProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
        <ScrollTop />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ProviderWrapper;
