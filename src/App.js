import { createBrowserRouter } from "react-router-dom";

import Login from "./components/screens/Login";
import Home from "./components/screens/Home";
import Blog from "./components/screens/Blog";
import Profile from "./components/screens/Profile";
import EditProfile from "./components/screens/EditProfile";
import EditBlog from "./components/screens/EditBlog";

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
  {
    path: "/blog/:id",
    element: <Blog />,
  },
  {
    path: "/profile/edit",
    element: <EditProfile />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/editor/:id",
    element: <EditBlog />,
  },
]);

export default app;
