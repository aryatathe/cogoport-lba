import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import Header from "../Header";
import BlogCard from "../BlogCard";
import FilterArea from "../FilterArea";
import ErrorBox from "../ErrorBox";

import topics from "../../content/topics";

const Home = () => {
  const [filterToggle, setFilterToggle] = useState(true);
  const [filterTopic, setFilterTopic] = useState(topics.map(() => true));
  const [blogs, setBlogs] = useState({ loading: true });

  const token = useSelector((state) => state.token);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  const topicResults = topics.filter((topic, i) => filterTopic[i]);
  console.log(topicResults);

  useEffect(() => {
    setBlogs({ loading: true });
    fetch(`${process.env.REACT_APP_API_URL}/view-posts?token=${token}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) setBlogs(result.posts);
          else setBlogs({ error: true });
        },
        (error) => {
          console.log(error);
          setBlogs({ error: true });
        }
      );
  }, []);

  return (
    <Box sx={{ maxWidth: "800px", margin: "auto" }}>
      <Stack
        direction="row"
        alignItems="stretch"
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ padding: { xs: "20px 20px 0 20px", md: "30px" } }}
      >
        <TextField
          variant="outlined"
          label="Search"
          size={sm ? "small" : "medium"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disableRipple edge="end">
                  <SearchIcon color="secondary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <IconButton disableRipple onClick={() => setFilterToggle(true)}>
          <FilterAltIcon color="secondary" fontSize={sm ? "medium" : "large"} />
        </IconButton>
        <FilterArea
          visible={filterToggle}
          close={() => setFilterToggle(false)}
          filterTopic={filterTopic}
          setFilterTopic={setFilterTopic}
        />
      </Stack>
      {blogs.loading || blogs.error ? (
        <ErrorBox
          message={blogs.loading ? "Loading..." : "Couldn't load blogs"}
        />
      ) : (
        <Stack
          direction="column"
          alignItems="stretch"
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            padding: { xs: "20px", md: "30px" },
          }}
        >
          {blogs
            .filter((blog) => topicResults.includes(blog.topics[0].name))
            .map((blog, i) => {
              return <BlogCard key={i} data={blog} />;
            })}
        </Stack>
      )}
    </Box>
  );
};

export default Home;
