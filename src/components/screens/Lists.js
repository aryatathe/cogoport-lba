import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import BlogCard from "../BlogCard";
import ErrorBox from "../ErrorBox";

const Lists = () => {
  const [listTab, setListTab] = useState(-1);
  const [lists, setLists] = useState({ loading: true });
  const [listView, setListView] = useState([]);
  const [create, setCreate] = useState("");

  const token = useSelector((state) => state.token);

  const fetchLists = () => {
    fetch(`${process.env.REACT_APP_API_URL}/view-all-lists?token=${token}`, {
      method: "get",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) setLists(result.lists);
          else setLists({ error: true });
        },
        (error) => {
          console.log(error);
          setLists({ error: true });
        }
      );
  };

  const fetchList = (id) => {
    setListView({ loading: true });
    fetch(
      `${process.env.REACT_APP_API_URL}/get-list?token=${token}&list_id=${id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) setListView(result.list.posts);
          else setListView({ error: true });
        },
        (error) => {
          console.log(error);
          setListView({ error: true });
        }
      );
  };

  const createList = () => {
    if (create == "") return;
    setLists({ loading: true });
    fetch(`${process.env.REACT_APP_API_URL}/create-list`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: token,
        list_name: create,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          fetchLists();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const deleteList = (list_id) => {
    fetch(`${process.env.REACT_APP_API_URL}/delete-list`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        token: token,
        list_name: create,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          fetchLists();
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    setLists({ loading: true });
    fetchLists();
  }, []);

  return lists.error || lists.loading ? (
    <div>load/err</div>
  ) : (
    <Grid
      container
      spacing={2}
      sx={{ maxWidth: "100%", padding: "20px 0 40px 20px" }}
    >
      <Grid item xs={12} sm={5} md={3}>
        {lists.map((list, i) => (
          <Button
            key={list.name}
            fullWidth
            variant={listTab == i ? "contained" : "text"}
            color={listTab == i ? "secondary" : "primary"}
            spacing={1}
            sx={{
              justifyContent: "space-between",
              pointerEvents: listTab == i ? "none" : "all",
              padding: "6px !important",
            }}
            onClick={() => {
              setListTab(i);
              fetchList(list.id);
            }}
          >
            <Typography variant="subtitle1">{list.name}</Typography>
            {listTab == i && (
              <IconButton
                size="small"
                sx={{ pointerEvents: "auto" }}
                onClick={() => {
                  setListTab(-1);
                  deleteList(list.id);
                }}
              >
                <DeleteIcon fontSize="medium" color="action" />
              </IconButton>
            )}
          </Button>
        ))}
        <Stack direction="row" alignItems="center" sx={{ marginTop: "20px" }}>
          <TextField
            value={create}
            label="Create"
            variant="outlined"
            fullWidth
            size="small"
            onChange={(e) => setCreate(e.target.value)}
          />
          <IconButton
            disableRipple
            onClick={() => {
              setCreate("");
              createList();
            }}
          >
            <AddOutlinedIcon color="secondary" fontSize="large" />
          </IconButton>
        </Stack>
      </Grid>
      <Grid item xs={12} sm={7} md={9}>
        {listView.loading || listView.error ? (
          <ErrorBox
            message={listView.loading ? "Loading..." : "Couldn't load blogs"}
          />
        ) : lists.length == 0 ? (
          <ErrorBox message="No lists found" />
        ) : listTab == -1 ? (
          <ErrorBox message="No list selected" />
        ) : listView.length == 0 ? (
          <ErrorBox message="No blogs found!" />
        ) : (
          <Stack direction="column" alignItems="stretch" spacing={2}>
            {listView.map((blog) => {
              return (
                <BlogCard
                  key={blog.postDetails.title}
                  data={blog.postDetails}
                  breakpointSwitch={true}
                />
              );
            })}
          </Stack>
        )}
      </Grid>
    </Grid>
  );
};

export default Lists;
