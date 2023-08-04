import { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from "@mui/material/Checkbox";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

import { styled } from "@mui/material/styles";

import topics from "../content/topics";
import users from "../content/users";

const FilterArea = ({ visible, close }) => {
  return (
    <Drawer anchor="right" open={visible}>
      <Stack
        direction="column"
        spacing={1}
        sx={{ maxWidth: "300px", margin: "10px" }}
      >
        <IconButton
          disableRipple
          onClick={close}
          sx={{ alignSelf: "flex-end" }}
        >
          <CloseIcon fontSize="large" color="secondary" />
        </IconButton>
        <Typography variant="h4">Filter</Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
            <Typography variant="subtitle1" color="secondary">
              Topics
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {topics.map((topic) => (
              <Stack direction="row" alignItems="center">
                <Checkbox defaultChecked size="small" />
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
        <Typography variant="h4">Sort</Typography>
      </Stack>
    </Drawer>
  );
};

export default FilterArea;
