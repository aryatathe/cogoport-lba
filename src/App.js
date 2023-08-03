import { createBrowserRouter } from "react-router-dom";

import Home from "./components/Home";

const app = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div>404</div>,
  },
]);

export default app;
