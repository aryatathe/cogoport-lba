import { useState } from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
            <LoginInput label="Name" variant="standard" />
            <LoginInput label="About" variant="standard" multiline />
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
        >
          Save
        </Button>
      </Stack>
    </>
  );
};

export default EditProfile;
