import { createTheme } from "@mui/material/styles";

const breakpointTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 540,
      md: 768,
      lg: 1100,
      xl: 1536,
    },
  },
});

const theme = createTheme({
  breakpoints: breakpointTheme.breakpoints,
  typography: {
    fontFamily: "Verdana, sans-serif",
    h1: {
      fontSize: 64,
      fontWeight: "bold",
      [breakpointTheme.breakpoints.down("md")]: { fontSize: 48 },
    },
    h2: {
      fontSize: 56,
      fontWeight: "bold",
      [breakpointTheme.breakpoints.down("md")]: { fontSize: 42 },
      [breakpointTheme.breakpoints.down("sm")]: { fontSize: 32 },
    },
    h3: {
      fontSize: 36,
      fontWeight: "bold",
      [breakpointTheme.breakpoints.down("md")]: { fontSize: 32 },
      [breakpointTheme.breakpoints.down("sm")]: { fontSize: 26 },
    },
    h4: {
      fontSize: 24,
      fontWeight: "bold",
    },
    subtitle1: {
      fontSize: 20,
      [breakpointTheme.breakpoints.down("md")]: { fontSize: 18 },
      [breakpointTheme.breakpoints.down("sm")]: { fontSize: 16 },
    },
    subtitle2: {
      fontSize: 18,
      [breakpointTheme.breakpoints.down("md")]: { fontSize: 16 },
      [breakpointTheme.breakpoints.down("sm")]: { fontSize: 14 },
    },
    body1: {
      fontSize: 16,
      [breakpointTheme.breakpoints.down("md")]: { fontSize: 14 },
      [breakpointTheme.breakpoints.down("sm")]: { fontSize: 13 },
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
    action: {
      main: "#2e282a",
      light: "#2e282a",
      dark: "#2e282a",
      contrastText: "#e3fcef",
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
          color: "inherit",
        },
        img: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 0.2s ease",
        },
        "#placeholderImage": {
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: { root: { transition: "all 0.2s ease" } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          "&.Mui-disabled": {
            color: "#000000cc",
            backgroundColor: "#00000044",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        },
      },
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
    MuiSelect: {
      styleOverrides: {
        root: {
          "& fieldset": {
            borderColor: "#ffc9b599",
          },
          "&:hover fieldset": {
            borderColor: "#ffc9b5 !important",
          },
        },
        select: {
          color: "#e3fcef",
        },
        icon: {
          color: "#ffc9b5",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffc9b599",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "#2e282a",
          padding: "20px",
          color: "inherit",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#2e282a",
          color: "inherit",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          background: "#00000022",
          color: "inherit",
          "&.Mui-expanded": {
            margin: 0,
            marginTop: "8px !important",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          "&.Mui-expanded": {
            minHeight: 0,
          },
        },
        content: {
          "&.Mui-expanded": { margin: "12px 0" },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#e2fcef77",
        },
      },
    },
  },
});

export default theme;
