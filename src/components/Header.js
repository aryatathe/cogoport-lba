import { NavLink } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

const HeaderContainer = styled(Stack)({
  background: "#ffffff11",
  padding: "10px 20px",
});

const NavButton = styled(Button)({
  fontSize: 18,
  "&.active": {
    pointerEvents: "none",
    background: "#ffffff22",
  },
});

const Header = () => {
  return (
    <HeaderContainer
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography variant="h1" color="secondary">
        BLOGS
      </Typography>
      <Stack direction="row" spacing={1}>
        <NavButton variant="outlined" component={NavLink} to="/">
          Home
        </NavButton>
        <NavButton variant="outlined" component={NavLink} to="/topics">
          Topics
        </NavButton>
        <NavButton variant="outlined" component={NavLink} to="/login">
          Login
        </NavButton>
        <NavButton variant="outlined" component={NavLink} to="/profile">
          Profile
        </NavButton>
      </Stack>
    </HeaderContainer>
  );
};

export default Header;
