import { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import { styled } from "@mui/material/styles";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";

import ErrorBox from "../ErrorBox";
import ListsPopup from "../ListsPopup";

import tempImage from "../../images/blog-temp.jpg";

const BlogContainer = styled(Grid)(({ theme }) => ({
  maxWidth: "800px !important",
  "& #blog-image": {
    position: "relative",
    margin: "20px auto",
    maxWidth: "800px",
    width: "100%",
    aspectRatio: "16/9",
  },
  "& .para": {
    margin: "15px 0",
  },
}));

const CommentsContainer = styled(Grid)(({ theme }) => ({
  maxWidth: "800px !important",
}));

const CommentCard = styled(Stack)(({ theme }) => ({
  borderBottom: "solid 2px #ffc9b566",
  paddingBottom: "20px",
  "& .image-box": {
    minWidth: "50px",
    minHeight: "50px",
    maxWidth: "50px",
    maxHeight: "50px",
    borderRadius: "50%",
    overflow: "hidden",
  },
}));

const Blog = () => {
  const [blog, setBlog] = useState({ loading: true });
  const [isLiked, setIsLiked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(-1);
  const [commentInput, setCommentInput] = useState("");
  const [popup, setPopup] = useState(false);

  const token = useSelector((state) => state.token);
  const myId = useSelector((state) => state.id);

  const id = useParams().id;

  const fetchBlog = (skip) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/get-post?token=${token}&post_id=${id}${
        skip == true ? "&skip=true" : ""
      }`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) {
            setBlog(result.post);
            let likeFlag = false,
              bookmarkFlag = -1;
            result.post.likesjunctions.forEach((like) => {
              if (like.user_details.id == myId) likeFlag = true;
            });
            setIsLiked(likeFlag);
            result.bookmarks.forEach((bookmark) => {
              if (bookmark.post_details.id == id) bookmarkFlag = bookmark.id;
            });
            setBookmarkId(bookmarkFlag);
          } else setBlog({ error: true });
        },
        (error) => {
          console.log(error);
          setBlog({ error: true });
        }
      );
  };

  const bookmark = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/${
        bookmarkId < 0 ? "add-to" : "remove-from"
      }-save-laters`,
      {
        method: bookmarkId < 0 ? "post" : "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token: token,
          post_id: id,
          save_later_id: bookmarkId,
        }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          fetchBlog(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const like = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/${isLiked ? "unlike" : "like"}-post`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: token, post_id: id }),
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          fetchBlog(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const addComment = () => {
    fetch(`${process.env.REACT_APP_API_URL}/add-comment`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: token,
        post_id: id,
        comment_description: commentInput,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setCommentInput("");
          fetchBlog(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const deleteComment = (commentId) => {
    fetch(`${process.env.REACT_APP_API_URL}/delete-comment`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: token,
        post_id: id,
        comment_id: commentId,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setCommentInput("");
          fetchBlog(true);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    setBlog({ loading: true });
    fetchBlog();
  }, []);

  return blog.loading || blog.error ? (
    <ErrorBox message={blog.loading ? "Loading..." : "Couldn't Load Blogs"} />
  ) : (
    <Grid
      container
      spacing={3}
      sx={{ padding: { xs: "20px 10px 30px 10px", sm: "40px 20px 50px 20px" } }}
      justifyContent="center"
    >
      <ListsPopup
        isOpen={popup}
        close={() => setPopup(false)}
        id={blog.id}
        type="blog"
      />
      <BlogContainer item xs={12} lg={8}>
        <Typography variant="h2" color="secondary" align="center">
          {blog.title}
        </Typography>
        <Box id="blog-image">
          <img id="placeholderImage" src={tempImage} />
          <img src={blog.image} />
        </Box>
        {blog.content.split("\n").map((para, i) => (
          <Typography key={i} variant="body1" className="para">
            {para}
          </Typography>
        ))}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{
            marginTop: "40px",
            marginBottom: { xs: "40px", sm: "80px" },
            paddingTop: "10px",
            borderTop: "solid 2px #ffc9b5aa",
          }}
        >
          <Stack
            direction="column"
            alignItems={{ xs: "center", sm: "flex-start" }}
            spacing={1}
            flexWrap="wrap"
          >
            <Typography
              variant="h4"
              color="secondary"
              component={Link}
              to={`/profile/${blog.user_details.id}`}
              sx={{ "&:hover": { opacity: 0.6 } }}
            >
              {blog.user_details.name}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2">
                {blog.created_at.slice(2, 10).split("-").reverse().join("/")}
              </Typography>

              <Typography variant="body2" color="secondary">
                {blog.topics[0].name}
              </Typography>

              <Typography variant="body2">{blog.views_count} views</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" alignItems="center">
            {token != "" ? (
              <>
                {blog.user_details.id == myId ? (
                  <IconButton
                    disableRipple
                    component={Link}
                    to={`/editor/${blog.id}`}
                  >
                    <EditIcon fontSize="large" color="secondary" />
                  </IconButton>
                ) : (
                  <>
                    <Typography variant="body2">{blog.likes_count}</Typography>
                    <IconButton disableRipple onClick={like}>
                      {isLiked ? (
                        <FavoriteIcon fontSize="large" color="secondary" />
                      ) : (
                        <FavoriteBorderIcon
                          fontSize="large"
                          color="secondary"
                        />
                      )}
                    </IconButton>
                    <IconButton disableRipple onClick={bookmark}>
                      {bookmarkId < 0 ? (
                        <BookmarkBorderIcon
                          fontSize="large"
                          color="secondary"
                        />
                      ) : (
                        <BookmarkIcon fontSize="large" color="secondary" />
                      )}
                    </IconButton>
                    <IconButton disableRipple onClick={() => setPopup(true)}>
                      <PlaylistAddOutlinedIcon
                        fontSize="large"
                        color="secondary"
                      />
                    </IconButton>
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      </BlogContainer>
      <CommentsContainer item xs={12} lg={4}>
        <Typography variant="h3" align="center">
          Comments
        </Typography>
        {blog.user_details.id != myId && (
          <TextField
            variant="outlined"
            label="Comment"
            size="medium"
            fullWidth
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disableRipple edge="end" onClick={addComment}>
                    <AddCommentOutlinedIcon color="secondary" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ flex: 1, marginTop: "20px" }}
          />
        )}
        <Stack
          direction="column"
          alignItems="stretch"
          spacing={2}
          sx={{ marginTop: "20px" }}
        >
          <Typography variant="subtitle2" color="secondary" align="right">
            {blog.comments_count} comment
            {blog.comments_count == 1 ? "" : "s"}
          </Typography>
          {blog.comments.map((comment, i) => (
            <CommentCard
              key={i}
              direction="row"
              justifyContent="center"
              spacing={2}
            >
              <Box className="image-box" flexGrow={1}>
                <img src={comment.user_details.pfp} />
              </Box>
              <Stack
                direction="column"
                justifyContent="space-between"
                flexGrow={1}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Typography variant="body1">{comment.description}</Typography>
                  {comment.user_details.id == myId && (
                    <IconButton
                      disableRipple
                      size="small"
                      onClick={() => deleteComment(comment.id)}
                    >
                      <DeleteOutlineIcon fontSize="small" color="secondary" />
                    </IconButton>
                  )}
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="secondary">
                    {comment.user_details.name}
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    {comment.created_at
                      .slice(2, 10)
                      .split("-")
                      .reverse()
                      .join("/")}
                  </Typography>
                </Stack>
              </Stack>
            </CommentCard>
          ))}
        </Stack>
      </CommentsContainer>
    </Grid>
  );
};

export default Blog;
