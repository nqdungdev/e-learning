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
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },

    paper: { main: "#fdfcf0" },
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
`;
export default GlobalStyles;
