import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const ListsPopup = ({ isOpen, close, id }) => {
  const [lists, setLists] = useState({ loading: true });
  const [create, setCreate] = useState("");

  const token = useSelector((state) => state.token);

  console.log(lists);

  const fetchLists = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/view-all-lists?token=${token}&post_id=${id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          if (result.status == 200) {
            let contains = result.contains;
            let listsData = result.lists.map((l) => ({
              ...l,
              contains: contains.includes(l.id),
            }));

            setLists(listsData);
          } else setLists({ error: true });
        },
        (error) => {
          console.log(error);
          setLists({ error: true });
        }
      );
  };

  const handleBlog = (listId, action) => {
    fetch(
      `${process.env.REACT_APP_API_URL}/${
        action == "post" ? "add-to" : "remove-from"
      }-list`,
      {
        method: action,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          token: token,
          post_id: id,
          list_id: listId,
        }),
      }
    )
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

  return (
    <Dialog open={isOpen} onClose={close}>
      {lists.error || lists.loading ? (
        <div>load/err</div>
      ) : (
        <Stack direction="column" spacing={1}>
          <Typography
            variant="h3"
            align="center"
            color="secondary"
            sx={{ marginBottom: "20px !important" }}
          >
            Add to Lists
          </Typography>
          {lists.map((list) => (
            <Button
              key={list.name}
              fullWidth
              variant={list.contains ? "contained" : "text"}
              color={list.contains ? "secondary" : "primary"}
              onClick={() =>
                handleBlog(list.id, list.contains ? "delete" : "post")
              }
            >
              <Typography variant="subtitle1">{list.name}</Typography>
            </Button>
          ))}
          <Stack direction="row" justifyContent="center" alignItems="center">
            <TextField
              value={create}
              label="Create"
              variant="outlined"
              fullWidth
              size="small"
              onChange={(e) => setCreate(e.target.value)}
            />
            <IconButton disableRipple>
              <AddOutlinedIcon color="secondary" fontSize="large" />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Dialog>
  );
};

export default ListsPopup;
