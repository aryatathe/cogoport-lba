import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import app from "./App";

import { ThemeProvider } from "@mui/material/styles";

import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={app} />
    </ThemeProvider>
  </React.StrictMode>
);
