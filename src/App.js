import { createBrowserRouter } from "react-router-dom";

import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Blog from "./components/screens/Blog";

const app = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404</div>,
  },
  {
    path: "/blog/:id",
    element: <Blog />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default app;
