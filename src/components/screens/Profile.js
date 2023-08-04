import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { styled } from "@mui/material/styles";

import Header from "../Header";
import BlogCard from "../BlogCard";

import blogs from "../../content/blogs";
import users from "../../content/users";

const BlogList = styled(Grid)({
  padding: "20px 20px 20px 0",
});

const UserInfo = styled(Stack)({
  padding: "40px 20px",
  "& #pfp": {
    maxWidth: "225px",
    aspectRatio: "1/1",
    borderRadius: "100%",
    overflow: "hidden",
    "& img": {
      maxWidth: "100%",
    },
  },
});

const Profile = () => {
  const [user, setUser] = useState({ loading: true });
  const [tab, setTab] = useState(0);

  const id = useParams().id;
  useEffect(() => {
    let flag = true;
    users.forEach((userItem) => {
      if (userItem.id == id) {
        setUser(userItem);
        flag = false;
      }
    });
    if (flag) setUser({ error: true });
  }, []);
  return (
    <>
      <Header />
      {user.loading ? (
        <div>loading</div>
      ) : user.error ? (
        <div>error</div>
      ) : (
        <Grid container>
          <Grid item xs={12} sm={4} lg={3} xl={2}>
            <UserInfo direction="column" alignItems="center" spacing={2}>
              <Box id="pfp">
                <img src={user.img} />
              </Box>
              <Typography variant="h3" color="secondary">
                {user.name}
              </Typography>
              <Typography variant="body2" align="center">
                {user.about}
              </Typography>
              <Typography variant="subtitle1" color="secondary">
                {user.followers} Followers
              </Typography>
              <Stack id="button-area" direction="row" spacing={1}>
                <Button variant="outlined" color="secondary">
                  Follow
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  component={NavLink}
                  to="/profile/edit"
                >
                  Edit
                </Button>
              </Stack>
            </UserInfo>
          </Grid>
          <Grid item xs={12} sm={8} lg={9} xl={10}>
            <Tabs
              value={tab}
              onChange={(e, newVal) => {
                setTab(newVal);
              }}
              textColor="primary"
              indicatorColor="primary"
              sx={{ marginTop: "40px" }}
            >
              <Tab label="Posts" value={0} disableRipple />
              <Tab label="Followers" value={1} disableRipple />
              <Tab label="Following" value={2} disableRipple />
            </Tabs>
            {tab == 0 ? (
              <BlogList container spacing={3}>
                {blogs
                  .filter((blog) => blog.author == user.name)
                  .map((blog, i) => {
                    return (
                      <BlogCard
                        key={i}
                        data={blog}
                        xs={12}
                        sm={12}
                        md={6}
                        lg={4}
                        xl={3}
                      />
                    );
                  })}
              </BlogList>
            ) : tab == 1 ? (
              <div>followers</div>
            ) : (
              <div>following</div>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
