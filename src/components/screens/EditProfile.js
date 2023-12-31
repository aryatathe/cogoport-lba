import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import tempImage from "../../images/pfp.png";

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const ImageBox = styled(Box)({
  minWidth: "200px",
  maxWidth: "300px",
  position: "relative",
  borderRadius: "50%",
  margin: "0 20px !important",
  overflow: "hidden",
  aspectRatio: "1/1",
  "& .MuiStack-root": {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "#2e282acc",
    opacity: 0,
    transition: "all 0.2s ease",
    "&:hover": {
      opacity: 1,
    },
  },
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

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
  const [data, setData] = useState({
    name: "",
    about: "",
    pfp: tempImage,
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);

  const navigate = useNavigate();

  useEffect(() => {
    if (token == "") {
      navigate("/login", { replace: true });
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

  const updatePassword = () => {
    fetch(`${process.env.REACT_APP_API_URL}/change-password`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ password: password, token: token }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setMessage(result.msg);
        },
        (error) => {
          console.log(error);
        }
      );
  };

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
          setMessage(result.msg);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
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
        sx={{ margin: "40px 0" }}
      >
        {tab == 0 ? (
          <>
            <ImageBox>
              <img src={data.pfp}></img>
              <Stack alignItems="center" justifyContent="center">
                <Button variant="contained" color="secondary" component="label">
                  Upload Image
                  <input
                    type="file"
                    hidden
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      console.log(URL.createObjectURL(file));
                      const base64 = await convertBase64(file);
                      setData({
                        ...data,
                        pfp: base64,
                      });
                    }}
                  />
                </Button>
              </Stack>
            </ImageBox>
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
            <LoginInput
              label="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="standard"
            />
            <LoginInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="standard"
            />
          </>
        )}
        <Button
          variant="contained"
          color="secondary"
          sx={{ margin: "30px 0 !important" }}
          onClick={tab == 0 ? updateProfile : updatePassword}
          disabled={tab == 1 && password != confirmPassword}
        >
          {tab == 0 ? "Save" : "Update"}
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

export default EditProfile;
