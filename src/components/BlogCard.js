import { NavLink } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { styled } from "@mui/material/styles";

const BlogCardPaper = styled(Paper)({
  padding: "10px",
  borderRadius: "10px",
  background: "#433e3f",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "& img": {
    borderRadius: "10px",
    margin: "5px 0",
    opacity: 0.7,
  },
  "&:hover img": {
    opacity: 0.9,
  },
  "& .MuiSvgIcon-root": {
    marginLeft: "10px",
  },
});

const BlogCard = ({ data, xs, sm, md, lg, xl }) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <NavLink to={`/blog/${data.id}`}>
        <BlogCardPaper elevation={6}>
          <Typography variant="h3" align="center" color="secondary">
            {data.title}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" align="center" color="primary">
              {data.author}
            </Typography>
            <Typography variant="subtitle2" align="center" color="primary">
              {data.date}
            </Typography>
          </Stack>
          <Box>
            <img src={data.img} />
          </Box>

          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle2" color="primary">
              {data.topic}
            </Typography>
            <span style={{ flex: 1 }} />
            <FavoriteIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" color="primary">
              {data.likes}
            </Typography>
            <VisibilityIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" color="primary">
              {data.views}
            </Typography>
          </Stack>
        </BlogCardPaper>
      </NavLink>
    </Grid>
  );
};

export default BlogCard;
