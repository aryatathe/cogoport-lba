import { NavLink } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import Header from "../Header";
import BlogCard from "../BlogCard";

import blogs from "../../content/blogs";

const BlogContainer = styled(Grid)({
  padding: "30px",
});

const Home = () => {
  return (
    <>
      <Header />
      <BlogContainer container spacing={4}>
        {blogs.map((blog, i) => {
          return <BlogCard key={i} data={blog} />;
        })}
      </BlogContainer>
    </>
  );
};

export default Home;
