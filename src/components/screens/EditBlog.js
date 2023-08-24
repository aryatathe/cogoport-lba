import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

import { styled } from "@mui/material/styles";

import Header from "../Header";
import ErrorBox from "../ErrorBox";

import blogs from "../../content/blogs";
import topics from "../../content/topics";

import tempImage from "../../images/blog-temp.jpg";

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

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
  const [img, setImg] = useState(tempImage);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState(topics[0]);

  console.log(img);

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();

  const id = useParams().id;
  const navigate = useNavigate();

  console.log(topic);

  const createBlog = () => {
    fetch(`${process.env.REACT_APP_API_URL}/create-post`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: title,
        feature_image: img,
        content: content,
        topics: [topic],
        publish_status: true,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    if (id == "new") {
      setBlog({});
      return;
    }
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

  useEffect(() => {
    if (blog.loading || blog.error || id == "new") return;
    if (blog.author_id != myId) navigate(`/profile/${myId}`);
    setTitle(blog.title);
    setContent(blog.description);
    setTopic(blog.topic);
  }, [blog]);

  return (
    <>
      <Header />
      {blog.loading || blog.error ? (
        <ErrorBox
          message={blogs.loading ? "Loading..." : "Couldn't load blog"}
        />
      ) : (
        <Editor direction="column" alignItems="stretch" spacing={2}>
          <Typography variant="h2" align="center" color="primary">
            {id == "new" ? "Create" : "Edit"} Blog
          </Typography>
          <ImageBox>
            <img src={img}></img>
            <Stack alignItems="center" justifyContent="center">
              <Button variant="contained" color="secondary" component="label">
                Upload Image
                <input
                  type="file"
                  hidden
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    console.log(URL.createObjectURL(file));
                    const base64 = await convertBase64(file);
                    setImg(base64);
                  }}
                />
              </Button>
            </Stack>
          </ImageBox>
          <TextField
            value={title}
            label="Title"
            variant="outlined"
            multiline
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            value={content}
            label="Write Post"
            variant="outlined"
            multiline
            minRows={3}
            onChange={(e) => setContent(e.target.value)}
          />
          <Stack
            fullWidth
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <Autocomplete
              value={topic}
              disablePortal
              options={topics}
              getOptionLabel={(option) =>
                typeof option === "string" || option instanceof String
                  ? option
                  : ""
              }
              renderInput={(params) => (
                <TextField {...params} fullWidth label="Topic" />
              )}
              sx={{ flex: 1 }}
              onChange={(event, newValue) => {
                setTopic(newValue);
              }}
            />
            <Button variant="contained" color="secondary" onClick={createBlog}>
              Post
            </Button>
          </Stack>
        </Editor>
      )}
    </>
  );
};

export default EditBlog;
