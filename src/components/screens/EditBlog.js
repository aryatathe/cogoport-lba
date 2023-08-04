import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

import { styled } from "@mui/material/styles";

import Header from "../Header";

import blogs from "../../content/blogs";
import topics from "../../content/topics";

import tempImage from "../../images/blog-temp.jpg";

const Editor = styled(Stack)({
  maxWidth: "800px",
  margin: "30px auto",
  padding: "0 20px",
});

const ImageBox = styled(Box)({
  position: "relative",
  borderRadius: "5px",
  overflow: "hidden",
  aspectRatio: "16/9",
  "& .MuiStack-root": {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: "#2e282acc",
    opacity: 0,
    transition: "all 0.2s ease",
    "&:hover": {
      opacity: 1,
    },
  },
});

const EditBlog = () => {
  const [blog, setBlog] = useState({ loading: true });

  const id = useParams().id;
  useEffect(() => {
    if (id == "new") {
      setBlog({});
      return;
    }
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
        <Editor direction="column" alignItems="stretch" spacing={2}>
          <Typography variant="h2" align="center" color="primary">
            Create Blog
          </Typography>
          <ImageBox>
            <img src={tempImage}></img>
            <Stack alignItems="center" justifyContent="center">
              <Button variant="contained" color="secondary">
                Upload Image
              </Button>
            </Stack>
          </ImageBox>
          <TextField label="Title" variant="outlined" multiline />
          <TextField label="Write Post" variant="outlined" multiline rows={3} />
          <Stack
            fullWidth
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <Autocomplete
              disablePortal
              options={topics}
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Topic" />
              )}
              sx={{ flex: 1 }}
            />
            <Button variant="contained" color="secondary">
              Post
            </Button>
          </Stack>
        </Editor>
      )}
    </>
  );
};

export default EditBlog;
