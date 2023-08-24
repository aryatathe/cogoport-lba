import { NavLink } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";

import { styled } from "@mui/material/styles";

import tempImage from "../images/blog-temp.jpg";

const BlogCardPaper = styled(Paper)({
  padding: "10px",
  borderRadius: "10px",
  background: "#433e3f",
  transition: "all 0.2s ease",
  "& #image-box": {
    width: "100%",
    margin: "5px 0",
    aspectRatio: "16/9",
    position: "relative",
  },
  "&:hover": {
    transform: "scale(1.05)",
  },
  "& img": {
    borderRadius: "10px",
    opacity: 0.7,
  },
  "&:hover img": {
    opacity: 0.9,
  },
  "& .MuiSvgIcon-root": {
    margin: "0 3px 0 12px",
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
          <Typography
            variant="body2"
            align="center"
            color="primary"
            sx={{ transform: "translateY(5px)" }}
          >
            {data.topics[0].name}
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1" align="center" color="primary">
              {data.user_details.name}
            </Typography>
            <Typography variant="subtitle2" align="center" color="primary">
              {data.created_at.slice(2, 10).replaceAll("-", "/")}
            </Typography>
          </Stack>
          <Box id="image-box">
            <img id="placeholderImage" src={tempImage} />
            <img src={data.image_url} />
          </Box>

          <Stack direction="row" justifyContent="center" alignItems="center">
            <CommentIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" color="primary">
              {data.comments_count}
            </Typography>
            <FavoriteIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" color="primary">
              {data.likes_count}
            </Typography>
            <VisibilityIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" color="primary">
              {data.views_count}
            </Typography>
          </Stack>
        </BlogCardPaper>
      </NavLink>
    </Grid>
  );
};

export default BlogCard;
