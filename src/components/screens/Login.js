import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";

import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [tab, setTab] = useState(false);
  const [email, setEmail] = useState("xyz@gmail.com");
  const [password, setPassword] = useState("password");
  const [password2, setPassword2] = useState("password");
  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (token != "") navigate(`/profile/${myId}`);
  }, [myId]);

  const handleLogin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == "200")
            dispatch({
              type: "LOGIN",
              payload: {
                token: result.userDetails.token,
                id: result.userDetails.id,
                email: email,
              },
            });
          else setMessage(result.msg);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const handleSignup = () => {
    fetch(`${process.env.REACT_APP_API_URL}/sign-up`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200)
            dispatch({
              type: "LOGIN",
              payload: {
                token: result.userDetails.token,
                id: result.userDetails.id,
                email: email,
              },
            });
          else setMessage(result.msg);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
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
        sx={{ margin: "40px 0" }}
      >
        <TextField
          label="Email"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {tab && (
          <TextField
            label="Confirm Password"
            type="password"
            variant="standard"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        )}
        <Button
          variant="contained"
          color="secondary"
          sx={{ margin: "30px 0 !important" }}
          onClick={tab ? handleSignup : handleLogin}
          disabled={
            email == "" || password == "" || (tab && password != password2)
          }
        >
          {tab ? "Sign Up" : "Login"}
        </Button>
        {message != "" && (
          <Typography variant="body2" align="center" color="#e8ff59">
            {message}
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default Login;
