import { createGlobalStyle } from "styled-components";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    paper: Palette["primary"];
  }
  interface PaletteOptions {
    paper: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      light: "#352d66",
      main: "#060830",
      dark: "#000011",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff8a50",
      main: "#ff5722",
      dark: "#c41c00",
      contrastText: "#fff",
    },

    paper: { light: "#fff", main: "#fdfcf0", contrastText: "#000" },
    error: { main: "#e71a0f", dark: "#c0150c" },
  },
});

const GlobalStyles = createGlobalStyle`
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif !important;
  }
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  a{
    text-decoration: none !important;
  }
  .swal2-container {
    z-index: 20000 !important;
  }
`;
export default GlobalStyles;
