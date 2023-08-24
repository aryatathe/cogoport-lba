import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
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
  const [isLiked, setIsLiked] = useState(false);

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();

  const id = useParams().id;

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchBlog = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/get-post?token=${token}&post_id=${id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setBlog(result.post);
          let flag = false;
          result.post.likesjunctions.forEach((like) => {
            if (like.user_details.id == myId) flag = true;
          });
          setIsLiked(flag);
        },
        (error) => {
          console.log(error);
          //setBlog({ error: true });
        }
      );
  };

  const like = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/${isLiked ? "unlike" : "like"}-post`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: token, post_id: id }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          fetchBlog();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    setBlog({ loading: true });
    fetchBlog();
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
          {blog.content.split("\n").map((para, i) => (
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
                to={`/profile/${blog.user_details.id}`}
                sx={{ "&:hover": { opacity: 0.6 } }}
              >
                {blog.user_details.name}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Typography variant="body2">
                  {blog.created_at.slice(2, 10).replaceAll("-", "/")}
                </Typography>

                {sm ? (
                  <></>
                ) : (
                  <Typography variant="body2" color="secondary">
                    {blog.topics[0].name}
                  </Typography>
                )}
                <Typography variant="body2">
                  {blog.views_count} views
                </Typography>
              </Stack>
              {sm ? (
                <Typography variant="body2" color="secondary">
                  {blog.topics[0].name}
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
            <span style={{ flex: 1 }} />
            {token != "" ? (
              <>
                {blog.user_details.id == myId ? (
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
                    <IconButton disableRipple onClick={like}>
                      {isLiked ? (
                        <FavoriteIcon fontSize="large" color="secondary" />
                      ) : (
                        <FavoriteBorderIcon
                          fontSize="large"
                          color="secondary"
                        />
                      )}
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
