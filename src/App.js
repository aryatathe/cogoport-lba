import { createBrowserRouter } from "react-router-dom";

import Home from "./components/screens/Home";
import Login from "./components/screens/Login";

const app = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default app;
