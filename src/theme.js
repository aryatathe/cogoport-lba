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
          colorScheme: "dark",
          background: "#2e282a",
          color: "#e2fcef",
        },
        a: {
          textDecoration: "none",
        },
        img: { width: "100%", transition: "all 0.2s ease" },
      },
    },
    MuiTypography: {
      styleOverrides: { root: { transition: "all 0.2s ease" } },
    },
    MuiButton: {
      styleOverrides: { root: { textTransform: "none" } },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease",
          "&:not(.Mui-selected)": { color: "#ffc9b5" },
          "&:not(.Mui-selected):hover": {
            opacity: 0.6,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            color: "#ffc9b599",
          },
          "& .MuiInputBase-root": {
            color: "#e3fcef",
          },
          "& .MuiInputBase-root::before, & fieldset": {
            borderColor: "#ffc9b599 !important",
          },
          "& .MuiInputBase-root:hover::before, & .MuiInputBase-root:hover fieldset":
            {
              borderColor: "#ffc9b5 !important",
            },
          "& .MuiInputBase-root.Mui-focused fieldset": {
            borderColor: "#e3fcef !important",
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          background: "green",
        },
        popupIndicator: {
          color: "#ffc9b599",
        },
        clearIndicator: {
          color: "#ffc9b599",
        },
      },
    },
  },
});

export default theme;
