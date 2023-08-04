import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { styled } from "@mui/material/styles";

import Header from "../Header";

import blogs from "../../content/blogs";

const BlogContainer = styled(Box)({
  maxWidth: "800px",
  margin: "auto",
  marginTop: "20px",
  padding: "20px",
  "& #blog-image": { margin: "20px auto", maxWidth: "800px" },
  "& .para": {
    margin: "15px 0",
  },
});

const Blog = () => {
  const [blog, setBlog] = useState({ loading: true });

  const id = useParams().id;
  useEffect(() => {
    let flag = true;
    blogs.forEach((blogItem) => {
      if (blogItem.id == id) {
        setBlog(blogItem);
        flag = false;
      }
    });
    if (flag) setBlog({ error: true });
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
            <img src={blog.img} />
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
                to={`/profile/${blog.authorId}`}
                sx={{ "&:hover": { opacity: 0.6 } }}
              >
                {blog.author}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Typography variant="body2">{blog.date}</Typography>
                <Typography variant="body2">{blog.topic}</Typography>
                <Typography variant="body2">{blog.views} views</Typography>
              </Stack>
            </Stack>
            <span style={{ flex: 1 }} />
            <Typography variant="body2" sx={{ marginLeft: "10px" }}>
              {blog.likes}
            </Typography>
            <IconButton disableRipple>
              <FavoriteBorderIcon fontSize="large" color="secondary" />
            </IconButton>
            <IconButton disableRipple>
              <BookmarkBorderIcon fontSize="large" color="secondary" />
            </IconButton>
          </Stack>
        </BlogContainer>
      )}
    </>
  );
};

export default Blog;
