import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";

import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import CreateIcon from "@mui/icons-material/Create";
import MenuIcon from "@mui/icons-material/Menu";

const HeaderContainer = styled(Stack)(({ theme }) => ({
  background: "#ffffff11",
  padding: "10px 20px",
  [theme.breakpoints.down("md")]: {
    padding: "5px 10px",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  fontSize: 18,
  "&.active": {
    pointerEvents: "none",
    background: "#ffffff22",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: 0,
    fontSize: 16,
    padding: "5px 10px",
  },
}));

const NavButtons = () => {
  const loggedIn = useSelector((state) => state.isLoggedIn);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();
  return (
    <>
      <NavButton
        variant="contained"
        color="secondary"
        component={NavLink}
        to="/edit/new"
      >
        <CreateIcon fontSize="large" color="#2b282a" />
      </NavButton>
      <NavButton variant="outlined" component={NavLink} to="/">
        Browse
      </NavButton>
      <NavButton
        variant="outlined"
        component={NavLink}
        to={loggedIn ? `/profile/${myId}` : "/login"}
      >
        {loggedIn ? "Profile" : "Login"}
      </NavButton>
    </>
  );
};

const Header = () => {
  const [mobileToggle, setMobileToggle] = useState(false);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <HeaderContainer
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={1}
    >
      <Typography variant="h1" color="secondary">
        BLOGS
      </Typography>
      {sm ? (
        <>
          <IconButton disableRipple onClick={() => setMobileToggle(true)}>
            <MenuIcon color="primary" fontSize="large" />
          </IconButton>
          <Drawer
            anchor="top"
            open={mobileToggle}
            ModalProps={{ onBackdropClick: () => setMobileToggle(false) }}
          >
            <Stack direction="column" spacing={1} sx={{ padding: "10px" }}>
              <NavButtons />
            </Stack>
          </Drawer>
        </>
      ) : (
        <Stack direction="row" spacing={1}>
          <NavButtons />
        </Stack>
      )}
    </HeaderContainer>
  );
};

export default Header;
