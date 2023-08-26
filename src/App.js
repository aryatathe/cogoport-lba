import { useEffect } from "react";

import {
  Outlet,
  createBrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Header from "./components/Header";
import Login from "./components/screens/Login";
import Home from "./components/screens/Home";
import Lists from "./components/screens/Lists";
import Blog from "./components/screens/Blog";
import Profile from "./components/screens/Profile";
import EditProfile from "./components/screens/EditProfile";
import EditBlog from "./components/screens/EditBlog";
import ErrorBox from "./components/ErrorBox";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state.token);

  useEffect(() => {
    console.log(token == "" && location.pathname != "/login");
    if (token == "" && location.pathname != "/login") navigate("/login");
  }, [location, token]);

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
    errorElement: (
      <>
        <Header />
        <ErrorBox message="Invalid URL" />
      </>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "lists",
        element: <Lists />,
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
