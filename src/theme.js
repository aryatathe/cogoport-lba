import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {},
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#2e282a",
          color: "#ffc9b5",
        },
      },
    },
  },
});

export default theme;
