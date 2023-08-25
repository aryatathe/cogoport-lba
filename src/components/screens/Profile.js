import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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

const UserListItem = styled(Stack)(({ theme }) => ({
  transition: "all 0.2s ease",
  cursor: "pointer",
  "& .image-box": {
    minWidth: "80px",
    minHeight: "80px",
    maxWidth: "80px",
    maxHeight: "80px",
    borderRadius: "50%",
    overflow: "hidden",
  },
  "&:hover": {
    transform: "scale(1.03)",
  },
}));

const Profile = () => {
  const [user, setUser] = useState({ loading: true });
  const [blogs, setBlogs] = useState({ loading: true });
  const [bookmarks, setBookmarks] = useState({ loading: true });
  const [isFollowed, setIsFollowed] = useState(false);
  const [tab, setTab] = useState(0);

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);
  const dispatch = useDispatch();

  const id = useParams().id;

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

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

  const fetchBlogs = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/view-${
        id == myId ? "my-" : ""
      }posts?token=${token}&author_id=${id}`,
      {
        method: "get",
      }
    )
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
  };

  const fetchBookmarks = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/get-save-laters?token=${token}&author_id=${id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setBookmarks(result.savelaters);
        },
        (error) => {
          console.log(error);
          setBookmarks({ error: true });
        }
      );
  };

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

  useEffect(() => {
    setTab(0);
    setUser({ loading: true });
    setBlogs({ loading: true });
    setBookmarks({ loading: true });
    fetchUser();
    fetchBlogs();
    fetchBookmarks();
  }, [id]);

  return (
    <>
      <Header />
      {user.loading || user.error ? (
        <ErrorBox
          message={user.loading ? "Loading..." : "Couldn't load user"}
        />
      ) : (
        <Grid container>
          <Grid item xs={12} md={4} lg={3} xl={2}>
            <UserInfo direction="column" alignItems="center" spacing={2}>
              <Box id="pfp">
                <img src={user.pfp} />
              </Box>
              <Typography variant="h3" color="secondary">
                {user.name}
              </Typography>
              <Typography variant="body2" align="center">
                {user.about}
              </Typography>
              <Typography variant="subtitle1" color="secondary">
                {user.followers_count} Follower
                {user.followers_count != 1 ? "s" : ""}
              </Typography>
              <Stack id="button-area" direction="row" spacing={1}>
                {id == myId ? (
                  <>
                    <Button
                      variant="outlined"
                      color="secondary"
                      component={Link}
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
          <Grid item xs={12} md={8} lg={9} xl={10}>
            <Tabs
              value={tab}
              onChange={(e, newVal) => {
                setTab(newVal);
              }}
              textColor="primary"
              indicatorColor="primary"
              sx={{ marginTop: "40px" }}
              centered={{ xs: true, md: false }}
              variant={{ xs: "scrollable", sm: "standard" }}
            >
              <Tab
                label="Posts"
                value={0}
                disableRipple
                size={sm ? "small" : "medium"}
              />
              {id == myId && (
                <Tab
                  label="Bookmarks"
                  value={1}
                  disableRipple
                  size={sm ? "small" : "medium"}
                />
              )}
              {id == myId && (
                <Tab
                  label="Drafts"
                  value={2}
                  disableRipple
                  size={sm ? "small" : "medium"}
                />
              )}
              <Tab
                label="Followers"
                value={3}
                disableRipple
                size={sm ? "small" : "medium"}
              />
              <Tab
                label="Following"
                value={4}
                disableRipple
                size={sm ? "small" : "medium"}
              />
            </Tabs>
            {tab < 3 ? (
              blogs.loading || blogs.error ? (
                <ErrorBox
                  message={blogs.loading ? "Loading..." : "Couldn't load blogs"}
                />
              ) : (
                <Stack
                  direction="column"
                  spacing={3}
                  sx={{
                    padding: "20px 20px 20px 0",
                    [theme.breakpoints.down("md")]: {
                      padding: "30px 10px",
                    },
                  }}
                >
                  {blogs.loading ? (
                    <div>Loading</div>
                  ) : blogs.error ? (
                    <div>error</div>
                  ) : (
                    (tab == 1
                      ? bookmarks.map((x) => ({
                          ...x.post_details,
                          published: true,
                        }))
                      : blogs.filter((blog) =>
                          blog.published ? tab == 0 : tab == 2
                        )
                    ).map((blog, i) => {
                      return <BlogCard key={i} data={blog} />;
                    })
                  )}
                </Stack>
              )
            ) : (
              <Stack
                direction="row"
                justifyContent="center"
                flexWrap="wrap"
                spacing={{ xs: 3, md: 4 }}
                sx={{
                  padding: "40px 20px 20px 0",
                  maxWidth: "500px",
                  margin: "auto",
                  [theme.breakpoints.down("md")]: {
                    padding: "30px 10px",
                  },
                }}
              >
                {(tab == 3 ? user.Followers : user.Following).map((f, i) => (
                  <Link to={`/profile/${f.id}`}>
                    <UserListItem
                      key={f.name}
                      direction="column"
                      alignItems="center"
                      spacing={1}
                    >
                      <Box className="image-box">
                        <img src={f.pfp} />
                      </Box>
                      <Typography variant="h4">{f.name}</Typography>
                    </UserListItem>
                  </Link>
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
