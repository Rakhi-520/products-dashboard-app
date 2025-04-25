"use client";

import Header from "@app/components/common/header/header";
import Sidebar from "@app/components/common/sidebar/sidebar";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import LoadingSpinner from "../loadingSpinner";
import DynamicBreadcrumbs from "./dynamicBreadcrumbs";

export default function Dashboard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState<boolean | null>(null); // Initial null for loading
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // Get menu state from localStorage
    const savedState = localStorage.getItem("side-menu");
    const initialState = savedState === "false" ? false : true;
    setOpen(sm ? false : initialState);
  }, [sm]);

  useEffect(() => {
    // Save menu state to localStorage
    if (open !== null) {
      localStorage.setItem("side-menu", String(open));
    }
  }, [open]);

  // While loading state
  if (open === null) {
    return <LoadingSpinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* ✅ Header with SearchBar is rendered here */}
      <Header open={open} setOpen={setOpen} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          overflow: "auto",
          flexGrow: 1,
        }}
      >
        {/* Sidebar */}
        <Sidebar open={open} setOpen={setOpen} />

        {/* Main content area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowX: "hidden",
            overflowY: "scroll",
          }}
        >
          {/* Breadcrumb Navigation */}
          <DynamicBreadcrumbs />

          {/* Main Page Content */}
          <Container sx={{ py: 3 }} maxWidth="xl">
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
