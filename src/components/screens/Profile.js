import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Header from "../Header";
import BlogCard from "../BlogCard";
import ErrorBox from "../ErrorBox";

//import blogs from "../../content/blogs";
import users from "../../content/users";

const BlogList = styled(Grid)(({ theme }) => ({
  padding: "20px 20px 20px 0",
  [theme.breakpoints.down("sm")]: {
    padding: "10px",
  },
}));

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
  const [blogs, setBlogs] = useState({ loading: true });
  const [isFollowed, setIsFollowed] = useState(false);
  const [tab, setTab] = useState(0);

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();

  const id = useParams().id;

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  console.log(isFollowed);

  const fetchUser = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/get-profile?token=${token}&user_id=${id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setUser(result.profile);
          let flag = false;
          result.profile.Followers.forEach((x) => {
            if (x.id == myId) flag = true;
          });
          setIsFollowed(flag);
        },
        (error) => {
          console.log(error);
          setUser({ error: true });
        }
      );
  };

  useEffect(() => {
    setUser({ loading: true });
    fetchUser();
  }, []);

  const follow = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/${
        isFollowed ? "unfollow" : "follow"
      }-user`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: token, author_id: id }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          fetchUser();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <>
      <Header />
      {user.loading || user.error ? (
        <ErrorBox
          message={user.loading ? "Loading..." : "Couldn't load user"}
        />
      ) : (
        <Grid container>
          <Grid item xs={12} sm={4} lg={3} xl={2}>
            <UserInfo direction="column" alignItems="center" spacing={2}>
              <Box id="pfp">
                <img src={user.profile_pic_url} />
              </Box>
              <Typography variant="h3" color="secondary">
                {user.name}
              </Typography>
              <Typography variant="body2" align="center">
                {user.about}
              </Typography>
              <Typography variant="subtitle1" color="secondary">
                {user.followers_count} Followers
              </Typography>
              <Stack id="button-area" direction="row" spacing={1}>
                {id == myId ? (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      component={NavLink}
                      to="/profile/edit"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => dispatch({ type: "LOGOUT" })}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button variant="outlined" color="secondary" onClick={follow}>
                    {isFollowed ? "Unfollow" : "Follow"}
                  </Button>
                )}
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
              centered={!sm}
              variant={sm ? "scrollable" : "standard"}
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab
                label="Posts"
                value={0}
                disableRipple
                size={sm ? "small" : "medium"}
              />
              <Tab
                label="Followers"
                value={1}
                disableRipple
                size={sm ? "small" : "medium"}
              />
              <Tab
                label="Following"
                value={2}
                disableRipple
                size={sm ? "small" : "medium"}
              />
            </Tabs>
            {tab == 0 ? (
              blogs.loading || blogs.error ? (
                <ErrorBox
                  message={user.loading ? "Loading..." : "Couldn't load blogs"}
                />
              ) : (
                <BlogList container spacing={3}>
                  {blogs.loading ? (
                    <div>Loading</div>
                  ) : blogs.error ? (
                    <div>error</div>
                  ) : (
                    blogs.map((blog, i) => {
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
                    })
                  )}
                </BlogList>
              )
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
