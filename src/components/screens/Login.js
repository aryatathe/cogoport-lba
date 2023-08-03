import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Header from "../Header";

const Login = () => {
  return (
    <>
      <Header />
      <Stack direction="column" alignItems="center" spacing={1}>
        <TextField label="username" variant="standard" />
        <TextField label="password" variant="standard" />
        <Button variant="contained">Login</Button>
      </Stack>
    </>
  );
};

export default Login;
