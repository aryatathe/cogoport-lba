import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Header from "../Header";

const Login = () => {
  const [tab, setTab] = useState(false);
  const [name, setName] = useState("xyz@gmail.com");
  const [email, setEmail] = useState("xyz@gmail.com");
  const [password, setPassword] = useState("password");
  const [password2, setPassword2] = useState("password");

  const loggedIn = useSelector((state) => state.isLoggedIn);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate(`/profile/${myId}`);
  }, [loggedIn]);

  const handleLogin = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          result.forEach((user) => {
            if (user.email == email) {
              fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: "post",
                headers: new Headers({
                  "ngrok-skip-browser-warning": "69420",
                }),
                body: formData,
              })
                .then((res) => res.json())
                .then(
                  (result) => {
                    console.log(result);
                    dispatch({
                      type: "LOGIN",
                      payload: {
                        token: result.token,
                        email: email,
                        id: user.id,
                      },
                    });
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleSignup = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "post",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
      body: formData,
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          handleLogin();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
      <Header />
      <Tabs
        value={tab ? 1 : 0}
        onChange={(e, newVal) => {
          setTab(newVal ? true : false);
        }}
        textColor="primary"
        indicatorColor="primary"
        centered
        sx={{
          marginTop: "50px",
        }}
      >
        <Tab label="Login" value={0} disableRipple />
        <Tab label="SignUp" value={1} disableRipple />
      </Tabs>
      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: "40px" }}
      >
        {tab && (
          <TextField
            label="Name"
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {tab && (
          <TextField
            label="Confirm Password"
            variant="standard"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        )}
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "30px !important" }}
          onClick={tab ? handleSignup : handleLogin}
          disabled={
            email == "" ||
            password == "" ||
            (tab && (name == "" || password != password2))
          }
        >
          {tab ? "Sign Up" : "Login"}
        </Button>
      </Stack>
    </>
  );
};

export default Login;
