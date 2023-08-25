import { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { styled } from "@mui/material/styles";

import topics from "../content/topics";
import users from "../content/users";

const FilterArea = ({ visible, close, filterTopic, setFilterTopic }) => {
  const topicCheck = (check, i) => {
    setFilterTopic((filterTopic) => {
      return filterTopic.map((f, j) => (i == j ? check : f));
    });
  };

  const topicCheckAll = topics.map(() => true);
  const topicCheckNone = topics.map(() => false);

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
            {topics.map((topic, i) => (
              <Stack key={topic} direction="row" alignItems="center">
                <Checkbox
                  size="small"
                  color="primary"
                  checked={filterTopic[i]}
                  onChange={(e) => topicCheck(e.target.checked, i)}
                />
                <Typography variant="body2">{topic}</Typography>
              </Stack>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Typography variant="subtitle1" color="secondary">
              Authors
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {users.map((user) => (
              <Stack direction="row" alignItems="center">
                <Checkbox defaultChecked size="small" />
                <Typography variant="body2">{user.name}</Typography>
              </Stack>
            ))}
          </AccordionDetails>
        </Accordion>
        <Typography variant="h4" align="center">
          Sort
        </Typography>
      </Stack>
    </Drawer>
  );
};

export default FilterArea;
