import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EditIcon from "@mui/icons-material/Edit";

import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../Header";

import tempImage from "../../images/blog-temp.jpg";

const BlogContainer = styled(Box)(({ theme }) => ({
  maxWidth: "800px",
  margin: "auto",
  marginTop: "20px",
  padding: "20px",
  "& #blog-image": {
    position: "relative",
    margin: "20px auto",
    maxWidth: "800px",
    width: "100%",
    aspectRatio: "16/9",
  },
  "& .para": {
    margin: "15px 0",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

const Blog = () => {
  const [blog, setBlog] = useState({ loading: true });

  const loggedIn = useSelector((state) => state.isLoggedIn);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();

  const id = useParams().id;

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setBlog({ loading: true });
    fetch(`${process.env.REACT_APP_API_URL}/articles/${id}`, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setBlog(result);
        },
        (error) => {
          console.log(error);
          setBlog({ error: true });
        }
      );
  }, []);

  return (
    <>
      <Header />
      {blog.loading ? (
        <div>Loading</div>
      ) : blog.error ? (
        <div>Error</div>
      ) : (
        <BlogContainer>
          <Typography variant="h2" color="secondary" align="center">
            {blog.title}
          </Typography>
          <Box id="blog-image">
            <img id="placeholderImage" src={tempImage} />
            <img src={blog.image} />
          </Box>
          {blog.description.split("\n").map((para, i) => (
            <Typography variant="body1" key={i} className="para">
              {para}
            </Typography>
          ))}
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              marginTop: "40px",
              marginBottom: "80px",
              paddingTop: "10px",
              borderTop: "solid 2px #ffc9b5aa",
            }}
          >
            <Stack direction="column">
              <Typography
                variant="h4"
                color="secondary"
                component={NavLink}
                to={`/profile/${blog.authorId}`}
                sx={{ "&:hover": { opacity: 0.6 } }}
              >
                {blog.author_name}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="body2">
                  {blog.created_at.slice(2, 10).replaceAll("-", "/")}
                </Typography>

                {sm ? (
                  <></>
                ) : (
                  <Typography variant="body2" color="secondary">
                    {blog.topic}
                  </Typography>
                )}
                <Typography variant="body2">
                  {blog.views_count} views
                </Typography>
              </Stack>
              {sm ? (
                <Typography variant="body2" color="secondary">
                  {blog.topic}
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
            <span style={{ flex: 1 }} />
            {loggedIn ? (
              <>
                {id == myId ? (
                  <IconButton
                    disableRipple
                    component={NavLink}
                    to={`/editor/${blog.id}`}
                  >
                    <EditIcon fontSize="large" color="secondary" />
                  </IconButton>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ marginLeft: "10px" }}>
                      {blog.likes_count}
                    </Typography>
                    <IconButton disableRipple>
                      <FavoriteBorderIcon fontSize="large" color="secondary" />
                    </IconButton>
                  </>
                )}
                <IconButton disableRipple>
                  <BookmarkBorderIcon fontSize="large" color="secondary" />
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </Stack>
        </BlogContainer>
      )}
    </>
  );
};

export default Blog;
