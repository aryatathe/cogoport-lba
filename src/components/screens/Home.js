import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import BlogCard from "../BlogCard";
import FilterArea from "../FilterArea";
import ErrorBox from "../ErrorBox";

import topics from "../../content/topics";

const Home = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filterToggle, setFilterToggle] = useState(false);
  const [filterTopic, setFilterTopic] = useState(topics.map(() => true));
  const [filterAuthor, setFilterAuthor] = useState([]);
  const [sortState, setSortState] = useState(0);
  const [blogs, setBlogs] = useState({ loading: true });

  const token = useSelector((state) => state.token);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const topicResults = topics.filter((topic, i) => filterTopic[i]);

  useEffect(() => {
    setBlogs({ loading: true });
    fetch(
      `${process.env.REACT_APP_API_URL}/${
        tab == 0
          ? "view-posts"
          : tab == 1
          ? "get-top-posts"
          : "get-recommendations"
      }?token=${token}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          let list = result.posts ? result.posts : result.recommendations;
          if (result.status == 200) {
            let userSet = [];
            list.forEach((blog) => {
              if (userSet.includes(blog.user_details.name));
              else userSet.push(blog.user_details.name);
            });
            let obj = userSet.reduce((acc, value) => {
              return { ...acc, [value]: true };
            }, {});
            setFilterAuthor(obj);
            setBlogs(list);
          } else setBlogs({ error: true });
        },
        (error) => {
          console.log(error);
          setBlogs({ error: true });
        }
      );
  }, [tab]);

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
          value={search}
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
          onChange={(e) => setSearch(e.target.value)}
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
          filterAuthor={filterAuthor}
          setFilterAuthor={setFilterAuthor}
          sortState={sortState}
          setSortState={setSortState}
        />
      </Stack>
      <Tabs
        value={tab}
        onChange={(e, newVal) => {
          setTab(newVal);
        }}
        textColor="primary"
        indicatorColor="primary"
        sx={{ maxWidth: "fit-content", margin: "auto" }}
        variant="scrollable"
      >
        <Tab
          label="All Blogs"
          value={0}
          disableRipple
          size={sm ? "small" : "medium"}
        />
        <Tab
          label="Top Blogs"
          value={1}
          disableRipple
          size={sm ? "small" : "medium"}
        />
        <Tab
          label="Recommended"
          value={2}
          disableRipple
          size={sm ? "small" : "medium"}
        />
      </Tabs>
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
            .filter((blog) => blog.title.toLowerCase().includes(search))
            .filter((blog) => topicResults.includes(blog.topics[0].name))
            .filter((blog) => filterAuthor[blog.user_details.name])
            .sort((a, b) => {
              if (sortState == 0) return 1;
              return (
                (sortState < 3
                  ? a.views_count < b.views_count
                    ? 1
                    : -1
                  : sortState < 5
                  ? a.likes_count < b.likes_count
                    ? 1
                    : -1
                  : a.comments_count < b.comments_count
                  ? 1
                  : -1) * (sortState % 2 ? 1 : -1)
              );
            })
            .map((blog) => {
              return <BlogCard key={blog.title} data={blog} />;
            })}
        </Stack>
      )}
    </Box>
  );
};

export default Home;
