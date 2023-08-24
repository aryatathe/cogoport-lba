import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
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
  const [filterToggle, setFilterToggle] = useState(false);
  const [blogs, setBlogs] = useState({ loading: true });

  const token = useSelector((state) => state.token);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setBlogs({ loading: true });
    fetch(`${process.env.REACT_APP_API_URL}/view-posts?token=${token}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setBlogs(result.posts);
        },
        (error) => {
          console.log(error);
          setBlogs({ error: true });
        }
      );
  }, []);

  return (
    <>
      <Header />
      <Stack
        direction="row"
        alignItems="stretch"
        spacing={sm ? 1 : md ? 2 : 3}
        sx={{ padding: md ? "20px 20px 0 20px" : "30px" }}
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
        />
      </Stack>
      {blogs.loading || blogs.error ? (
        <ErrorBox
          message={blogs.loading ? "Loading..." : "Couldn't load blogs"}
        />
      ) : (
        <Grid
          container
          spacing={sm ? 2 : md ? 3 : 4}
          sx={{ padding: md ? "20px" : "30px" }}
        >
          {blogs.map((blog, i) => {
            return (
              <BlogCard
                key={i}
                data={blog}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
              />
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default Home;
