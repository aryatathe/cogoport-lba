import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { styled } from "@mui/material/styles";

import Header from "../Header";

const LoginInput = styled(TextField)({
  "& label": {
    color: "#ffc9b599",
  },
  "& .MuiInputBase-root": {
    color: "#e3fcef",
  },
  "& .MuiInputBase-root::before": {
    borderColor: "#ffc9b599 !important",
  },
  "& .MuiInputBase-root:hover::before": {
    borderColor: "#ffc9b5 !important",
  },
});

const EditProfile = () => {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState({ name: "", about: "" });

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);

  const navigate = useNavigate();

  console.log(data);

  useEffect(() => {
    if (token == "") {
      navigate("/login");
      return;
    }
    fetch(
      `${process.env.REACT_APP_API_URL}/get-profile?token=${token}&user_id=${myId}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) setData(result.profile);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const updateProfile = () => {
    fetch(`${process.env.REACT_APP_API_URL}/edit-user-details`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...data, token: token }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
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
        value={tab}
        onChange={(e, newVal) => {
          setTab(newVal);
        }}
        textColor="primary"
        indicatorColor="primary"
        centered
        sx={{
          marginTop: "50px",
        }}
      >
        <Tab label="Details" value={0} disableRipple />
        <Tab label="Password" value={1} disableRipple />
      </Tabs>
      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: "40px" }}
      >
        {tab == 0 ? (
          <>
            <LoginInput
              label="Name"
              value={data.name ? data.name : ""}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              variant="standard"
            />
            <LoginInput
              label="About"
              value={data.about ? data.about : ""}
              onChange={(e) => setData({ ...data, about: e.target.value })}
              variant="standard"
              multiline
            />
          </>
        ) : (
          <>
            <LoginInput label="Old Password" variant="standard" />
            <LoginInput label="New Password" variant="standard" />
            <LoginInput label="Confirm Password" variant="standard" />
          </>
        )}
        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: "30px !important" }}
          onClick={updateProfile}
        >
          Save
        </Button>
      </Stack>
    </>
  );
};

export default EditProfile;
