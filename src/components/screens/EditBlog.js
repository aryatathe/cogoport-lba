import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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

const VersionCard = styled(Stack)({
  background: "#433e3f",
  borderRadius: "10px",
  padding: "10px",
  margin: "10px",
  transition: "all 0.2s ease",
  cursor: "pointer",
  "&:hover": { transform: "scale(1.03)" },
});

const EditBlog = () => {
  const [blog, setBlog] = useState({ loading: true });
  const [img, setImg] = useState(tempImage);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState("");
  const [versions, setVersions] = useState([]);

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();

  const id = useParams().id;
  const navigate = useNavigate();

  const uploadBlog = (isDraft) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/${
        id == "new" ? "create" : "update"
      }-post`,
      {
        method: id == "new" ? "post" : "put",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token: token,
          post_id: blog.id,
          title: title,
          featured_image: img,
          content: content,
          topics: [topic],
          publish_status: !isDraft,
        }),
      }
    )
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

  const deleteBlog = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/delete-post?token=${token}&post_id=${id}`,
      {
        method: "delete",
      }
    )
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
          if (result.status == 200) setBlog(result.post);
          else setBlog({ error: true });
        },
        (error) => {
          console.log(error);
          setBlog({ error: true });
        }
      );
  }, []);

  useEffect(() => {
    if (id == "new") {
      setVersions([]);
      return;
    }
    setVersions([]);
    fetch(
      `${process.env.REACT_APP_API_URL}/get-all-versions-of-post?token=${token}&post_id=${id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) setVersions(result.versions);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    if (blog.loading || blog.error || id == "new") return;
    if (blog.user_details.id != myId)
      navigate(`/profile/${myId}`, { replace: true });
    setTitle(blog.title);
    setContent(blog.content);
    setTopic(blog.topics[0].name);
  }, [blog]);

  return blog.loading || blog.error ? (
    <ErrorBox message={blogs.loading ? "Loading..." : "Couldn't load blog"} />
  ) : (
    <Stack
      direction="column"
      alignItems="stretch"
      spacing={2}
      sx={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "0 20px",
      }}
    >
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
        label="Content"
        variant="outlined"
        multiline
        minRows={3}
        onChange={(e) => setContent(e.target.value)}
      />
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        spacing={2}
        rowGap={2}
        sx={{ marginBottom: "30px !important" }}
      >
        {/*<Autocomplete
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
            />*/}
        <FormControl sx={{ flexGrow: 1, minWidth: "300px" }}>
          <InputLabel>Topic</InputLabel>
          <Select
            variant="outlined"
            value={topic}
            label="Topic"
            onChange={(e) => {
              setTopic(e.target.value);
            }}
          >
            {topics.map((topic, i) => (
              <MenuItem key={i} value={topic}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" justifyContent="center" spacing={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => uploadBlog(true)}
          >
            Draft
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => uploadBlog(false)}
          >
            Publish
          </Button>
          {id != "new" && (
            <Button
              variant="contained"
              color="error"
              onClick={deleteBlog}
              disabled
            >
              Delete
            </Button>
          )}
        </Stack>
      </Stack>
      {id != "new" && versions.length > 1 && (
        <>
          <Typography variant="h3" align="center" color="primary">
            Load Previous Version
          </Typography>
          <Grid
            container
            direction="row-reverse"
            alignItems="stretch"
            justifyContent="center"
            sx={{ maxWidth: "100%" }}
          >
            {versions.map((version, i) => {
              var localTime = new Date(version.updated_at);
              localTime = new Date(
                localTime.getTime() + localTime.getTimezoneOffset() * 60000
              ).toISOString();
              console.log(localTime);
              return (
                <Grid item xs={4} sm={3}>
                  <VersionCard
                    direction="column"
                    alignItems="center"
                    component={Paper}
                    elevation={6}
                    onClick={() => {
                      setTitle(version.title);
                      setContent(version.content);
                      setImg(version.featured_image);
                    }}
                  >
                    <Typography variant="h3" color="secondary">
                      v{version.version}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      {localTime.slice(2, 10).split("-").reverse().join("/")}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      {localTime.slice(11, 16).split("-").reverse().join("/")}
                    </Typography>
                  </VersionCard>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Stack>
  );
};

export default EditBlog;
