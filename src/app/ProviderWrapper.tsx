"use client";
import { ReactElement, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CacheProvider, EmotionCache } from "@emotion/react";

// MATERIAL - UI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";

// PROJECT IMPORTS
import "./globals.css";
import theme from "@/themes/theme";
import ScrollTop from "@/layout/ScrolllTop";
import createEmotionCache from "@/themes/createEmotion";

const clientSideEmotionCache = createEmotionCache();

type RootLayoutProps = {
  children: ReactElement;
  emotionCache?: EmotionCache;
};

const ProviderWrapper = ({
  children,
  emotionCache = clientSideEmotionCache,
}: RootLayoutProps) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure this component is only rendered on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Avoid rendering until the client is ready
  }

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
