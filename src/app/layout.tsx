"use client";
// PROJECT IMPORTS
import ProviderWrapper from "./ProviderWrapper";

type RootLayoutProps = {
  children: React.ReactElement;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
