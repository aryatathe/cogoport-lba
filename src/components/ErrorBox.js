import Typography from "@mui/material/Typography";

const ErrorBox = ({ message }) => {
  return (
    <Typography
      variant="h3"
      align="center"
      sx={{ margin: "40px 20px 20px 20px" }}
    >
      {message}
    </Typography>
  );
};

export default ErrorBox;
