import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store/store";

import { ThemeProvider } from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

import app from "./App";

import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={app} />
    </ThemeProvider>
  </Provider>
);
