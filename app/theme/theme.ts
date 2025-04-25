import { createTheme } from "@mui/material/styles";
import { darkPalette, lightPalette } from "./colorPalette";
import { fontFamily } from "./fontFamily";
import { ScrollBarStyle } from "./scrollBar";
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: { palette: lightPalette },
    dark: { palette: darkPalette },
  },
  typography: fontFamily,
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...ScrollBarStyle,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 5,
        },
      },
    },
  },
});

export default theme;
