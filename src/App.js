import { useEffect } from "react";

import {
  Outlet,
  createBrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./components/screens/Login";
import Home from "./components/screens/Home";
import Blog from "./components/screens/Blog";
import Profile from "./components/screens/Profile";
import EditProfile from "./components/screens/EditProfile";
import EditBlog from "./components/screens/EditBlog";

import Header from "./components/Header";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (token == "") navigate("/login");
  }, [location]);

  return (
    <>
      <Header />
      {(token != "" || location.pathname == "/login") && <Outlet />}
    </>
  );
};

const app = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <div>404</div>,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "blog/:id",
        element: <Blog />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
      {
        path: "profile/:id",
        element: <Profile />,
      },
      {
        path: "editor/:id",
        element: <EditBlog />,
      },
    ],
  },
]);

export default app;
