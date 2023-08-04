import { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { styled } from "@mui/material/styles";

import Header from "../Header";

const Login = () => {
  const [tab, setTab] = useState(false);
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
        {tab && <TextField label="Email" variant="standard" />}
        <TextField label="Username" variant="standard" />
        <TextField label="Password" variant="standard" />
        {tab && <TextField label="Confirm Password" variant="standard" />}
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "30px !important" }}
        >
          {tab ? "Login" : "Sign Up"}
        </Button>
      </Stack>
    </>
  );
};

export default Login;
