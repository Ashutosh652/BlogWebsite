import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Button, Tooltip, Paper } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import NavBar from "../../Components/NavBar/NavBar";
import ACard from "../../Components/Card/ACard";
import Popup from "../../Components/Popup/Popup";
import {
  BlogsContainer,
  BlogContent,
  BlogTitleContainer,
  Cover,
  EditIcon,
} from "./BlogDetailPageStyles";
import { axiosInstance } from "../../axios";
import { timeSince } from "../../formatDate";
import AuthContext from "../Login/AuthContext";

const BlogDetailPage = () => {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editOf, setEditOf] = useState("");
  const [triggerValue, setTriggerValue] = useState(false);
  const imgUrl = post ? `http://localhost:8000${post.pic}` : null;

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`blog/post/${postid}`);
        setPost(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [post]);

  const handleNameClick = (event) => {
    event.preventDefault();
    navigate(`/user/posts/${post.author}`);
  };

  const handleEditClick = (editOf) => {
    setEditOf(editOf);
    setTriggerValue(true);
  };

  const handlePostDelete = async (event) => {
    event.preventDefault();
    await axiosInstance.delete(`blog/postedit/${post.id}`);
    navigate(`/user/posts/${user.user.id}`);
  };

  return (
    <>
      <NavBar />
      <Cover>
        <Box>React Blog</Box>
      </Cover>
      <BlogsContainer maxWidth="lg">
        {post ? (
          <>
            <BlogTitleContainer>
              <Box>
                <Typography variant="h3">
                  {post.title}
                  <Tooltip title="Edit Title">
                    {post.author === user.user.id ? (
                      <EditIcon
                        color="secondary"
                        onClick={() => {
                          handleEditClick("title");
                        }}
                      />
                    ) : null}
                  </Tooltip>
                </Typography>
                <Button onClick={handleNameClick}>{post.author_name}</Button>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  component="p"
                >
                  {timeSince(new Date(post.last_updated))} ago
                </Typography>
              </Box>
              {post.author === user.user.id && (
                <Button sx={{ color: "red" }} onClick={handlePostDelete}>
                  Delete Post
                </Button>
              )}
            </BlogTitleContainer>

            {post.pic ? (
              <Paper elevation={0}>
                <Box
                  component="img"
                  src={imgUrl}
                  sx={{ maxHeight: "30rem", maxWidth: "40rem" }}
                />
              </Paper>
            ) : null}

            <BlogContent>
              <Tooltip title="Edit Content">
                {post.author === user.user.id ? (
                  <EditIcon
                    color="secondary"
                    onClick={() => {
                      handleEditClick("content");
                    }}
                  />
                ) : null}
              </Tooltip>
              <br />
              {post.body}
            </BlogContent>
          </>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </BlogsContainer>
      {post ? (
        <Popup
          triggerValue={triggerValue}
          editOf={editOf}
          setTriggerValue={setTriggerValue}
          title={post.title}
          content={post.body}
          postid={postid}
          setPost={setPost}
        />
      ) : null}
    </>
  );
};

export default BlogDetailPage;
