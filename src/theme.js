import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Verdana, sans-serif",
    h1: {
      fontSize: 64,
      color: "#ffc9b5",
      fontWeight: "bold",
    },
  },
  palette: {
    primary: {
      main: "#e3fcef",
      light: "#e3fcef",
      dark: "#e3fcef",
      contrastText: "#2e282a",
    },
    secondary: {
      main: "#ffc9b5",
      light: "#ffc9b5",
      dark: "#ffc9b5",
      contrastText: "#2e282a",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#2e282a",
          color: "#e2fcef",
        },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none" } },
    },
  },
});

export default theme;
