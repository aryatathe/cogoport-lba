import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { styled } from "@mui/material/styles";

import Header from "../Header";

import blogs from "../../content/blogs";
import { MarginRounded } from "@mui/icons-material";

const BlogContainer = styled(Box)({
  maxWidth: "800px",
  margin: "auto",
  marginTop: "20px",
  padding: "20px",
  "& #blog-image": { margin: "20px auto", maxWidth: "800px" },
  "& .para": {
    margin: "15px 0",
  },
});

const CustomIconButton = styled(IconButton)({
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "scale(1.1)",
  },
});

const Profile = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default Profile;
