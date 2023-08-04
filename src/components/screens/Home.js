import { useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import Header from "../Header";
import BlogCard from "../BlogCard";
import FilterArea from "../FilterArea";

import blogs from "../../content/blogs";
import topics from "../../content/topics";

const Home = () => {
  const [filterToggle, setFilterToggle] = useState(true);
  return (
    <>
      <Header />
      <Stack
        direction="row"
        alignItems="stretch"
        spacing={3}
        sx={{ padding: "30px" }}
      >
        <TextField
          variant="outlined"
          label="Search"
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
        <IconButton
          disableRipple
          onClick={() => setFilterToggle(!filterToggle)}
        >
          <FilterAltIcon color="secondary" fontSize="large" />
        </IconButton>
        <FilterArea
          visible={filterToggle}
          close={() => setFilterToggle(!filterToggle)}
        />
      </Stack>
      <Grid container spacing={4} sx={{ padding: "30px" }}>
        {blogs.map((blog, i) => {
          return (
            <BlogCard key={i} data={blog} xs={12} sm={6} md={4} lg={3} xl={2} />
          );
        })}
      </Grid>
    </>
  );
};

export default Home;
