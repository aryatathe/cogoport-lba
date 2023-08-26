import { useState } from "react";

import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import topics from "../content/topics";

const FilterArea = ({
  visible,
  close,
  filterTopic,
  setFilterTopic,
  filterAuthor,
  setFilterAuthor,
  sortState,
  setSortState,
}) => {
  const [topicSearch, setTopicSearch] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");

  const topicCheck = (check, i) => {
    setFilterTopic((filterTopic) => {
      return filterTopic.map((f, j) => (i == j ? check : f));
    });
  };

  const topicCheckAll = topics.map(() => true);
  const topicCheckNone = topics.map(() => false);

  const authorCheckAll = () => {
    let ans = true;
    Object.keys(filterAuthor).forEach((author) => {
      if (filterAuthor[author] == false) ans = false;
    });
    return ans;
  };

  const SortButton = ({ direction, order }) => {
    return (
      <Button
        variant={order === sortState ? "contained" : "outlined"}
        color="secondary"
        size="small"
        sx={{ minWidth: 0 }}
        onClick={() => {
          order == sortState ? setSortState(0) : setSortState(order);
        }}
      >
        {direction == "up" ? (
          <ArrowUpwardIcon fontSize="small" />
        ) : (
          <ArrowDownwardIcon fontSize="small" />
        )}
      </Button>
    );
  };

  return (
    <Drawer
      anchor="right"
      open={visible}
      ModalProps={{ onBackdropClick: close }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{ maxWidth: "300px", margin: "20px 10px" }}
      >
        <Typography variant="h4" align="center">
          Filter
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Typography variant="subtitle1" color="secondary">
              Topics
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              variant="standard"
              label="Search"
              size="small"
              fullWidth
              value={topicSearch}
              onChange={(e) => setTopicSearch(e.target.value)}
              sx={{ marginBottom: "10px" }}
            />
            <Stack direction="row" alignItems="center">
              <Checkbox
                size="small"
                color="primary"
                checked={
                  JSON.stringify(filterTopic) == JSON.stringify(topicCheckAll)
                }
                onChange={(e) =>
                  setFilterTopic(
                    e.target.checked ? topicCheckAll : topicCheckNone
                  )
                }
              />
              <Typography variant="body2">All</Typography>
            </Stack>
            {topics.map((topic, i) => {
              if (topic.toLowerCase().includes(topicSearch))
                return (
                  <Stack key={topic} direction="row" alignItems="center">
                    <Checkbox
                      size="small"
                      color="primary"
                      checked={filterTopic[i]}
                      onChange={(e) => topicCheck(e.target.checked, i)}
                    />
                    <Typography variant="body2">{topic}</Typography>
                  </Stack>
                );
              else return;
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Typography variant="subtitle1" color="secondary">
              Authors
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              variant="standard"
              label="Search"
              size="small"
              fullWidth
              value={authorSearch}
              onChange={(e) => setAuthorSearch(e.target.value)}
              sx={{ marginBottom: "10px" }}
            />
            <Stack direction="row" alignItems="center">
              <Checkbox
                size="small"
                color="primary"
                checked={authorCheckAll()}
                onChange={(e) => {
                  let newFilterAuthor = { ...filterAuthor };
                  Object.keys(newFilterAuthor).forEach((author) => {
                    newFilterAuthor[author] = e.target.checked;
                  });
                  setFilterAuthor(newFilterAuthor);
                }}
              />
              <Typography variant="body2">All</Typography>
            </Stack>
            {Object.keys(filterAuthor).map((author) => {
              if (author.includes(authorSearch))
                return (
                  <Stack key={author} direction="row" alignItems="center">
                    <Checkbox
                      size="small"
                      checked={filterAuthor[author]}
                      onChange={(e) =>
                        setFilterAuthor({
                          ...filterAuthor,
                          [author]: e.target.checked,
                        })
                      }
                    />
                    <Typography variant="body2">{author}</Typography>
                  </Stack>
                );
              else return;
            })}
          </AccordionDetails>
        </Accordion>
        <Typography variant="h4" align="center">
          Sort
        </Typography>
        {["Views", "Likes", "Comments"].map((sortType, i) => (
          <Stack
            key={sortType}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <SortButton direction="up" order={2 * i + 1} />
            <Typography variant="body1" color="secondary">
              {sortType}
            </Typography>
            <SortButton direction="down" order={2 * i + 2} />
          </Stack>
        ))}
      </Stack>
    </Drawer>
  );
};

export default FilterArea;
