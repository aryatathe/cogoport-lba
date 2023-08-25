import { Link } from "react-router-dom";

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

const BlogCardPaper = styled(Paper)(({ theme }) => ({
  padding: "20px",
  borderRadius: "10px",
  background: "#433e3f",
  transition: "all 0.2s ease",
  "& #image-box": {
    minWidth: "50%",
    aspectRatio: "16/9",
    position: "relative",
  },
  "&:hover": {
    transform: "scale(1.03)",
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
  [theme.breakpoints.down("md")]: {
    padding: "15px",
    "& #image-box": {
      minWidth: "40%",
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
    "& #image-box": {
      width: "100%",
    },
  },
}));

const BlogCard = ({ data }) => {
  return (
    <Link to={`/blog/${data.id}`}>
      <BlogCardPaper
        elevation={6}
        component={Stack}
        direction={{ xs: "column", sm: "row" }}
        alignItems="stretch"
        spacing={{ xs: 1, sm: 2 }}
      >
        <Box id="image-box">
          <img id="placeholderImage" src={tempImage} />
          <img src={data.image_url} />
        </Box>
        <Stack direction="column" justifyContent="space-between" flexGrow={1}>
          <Stack direction="column" alignSelf="flex-start">
            <Typography variant="h3" color="secondary">
              {data.title}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              <i>by- </i>
              <strong>{data.user_details.name}</strong>
            </Typography>
          </Stack>
          <Stack direction="column" alignSelf="flex-end" alignItems="flex-end">
            <Typography variant="subtitle2" align="center" color="primary">
              {data.created_at.slice(2, 10).split("-").reverse().join("/")}
            </Typography>
            <Typography variant="subtitle2" align="center" color="secondary">
              {data.topics[0].name}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" alignSelf="flex-end">
            {data.published ? (
              <>
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
              </>
            ) : (
              <Typography variant="subtitle2" color="secondary">
                <i>Draft</i>
              </Typography>
            )}
          </Stack>
        </Stack>
      </BlogCardPaper>
    </Link>
  );
};

export default BlogCard;
