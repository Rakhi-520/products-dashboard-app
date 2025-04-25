import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Oswald, Roboto } from "next/font/google";

const primary = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});
const secondary = Oswald({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const fontFamily: TypographyOptions = {
  h1: { fontFamily: secondary.style.fontFamily },
  h2: { fontFamily: secondary.style.fontFamily },
  h3: { fontFamily: secondary.style.fontFamily },
  h4: { fontFamily: secondary.style.fontFamily },
  h5: { fontFamily: secondary.style.fontFamily },
  h6: { fontFamily: secondary.style.fontFamily },
  fontFamily: primary.style.fontFamily,
};
