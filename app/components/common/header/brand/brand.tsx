import Logo from "@app/logo.png";
import { Box, Link, Typography } from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";

export default function Brand() {
  return (
    <Link
      sx={{ display: { xs: "none", md: "flex" } }}
      color="textSecondary"
      underline="none"
      href="/"
      component={NextLink}
    >
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 3.5,
          px: "5px",
        }}
      >
        <Image width={32} height={32} src={Logo} alt="logo" />
        <Typography variant="h5" component="h1">
          Dashboard App
        </Typography>
      </Box>
    </Link>
  );
}
