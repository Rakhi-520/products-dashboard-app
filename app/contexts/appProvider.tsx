"use client";
import theme from "@app/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "@mui/material/styles";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <InitColorSchemeScript
        modeStorageKey="color-mode"
        colorSchemeStorageKey="color-scheme"
        attribute="class"
      />

      <ThemeProvider
        modeStorageKey="color-mode"
        colorSchemeStorageKey="color-scheme"
        defaultMode="light"
        theme={theme}
      >
        <CssBaseline />
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
}
