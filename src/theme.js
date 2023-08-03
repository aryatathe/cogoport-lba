import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Verdana, sans-serif",
    h1: {
      fontSize: 64,
      fontWeight: "bold",
    },
    h2: {
      fontSize: 56,
      fontWeight: "bold",
    },
    h3: {
      fontSize: 28,
      fontWeight: "bold",
    },
    h4: {
      fontSize: 24,
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: 16,
    },
    subtitle2: {
      fontSize: 14,
    },
    body2: {
      fontSize: 16,
    },
    body2: {
      fontSize: 12,
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
        a: {
          textDecoration: "none",
        },
        img: { maxWidth: "100%" },
      },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none" } },
    },
  },
});

export default theme;
