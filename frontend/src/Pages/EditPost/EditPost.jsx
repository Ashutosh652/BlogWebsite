import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { Typography, Box, Button } from "@mui/material";
import { PostInputWrapper, InputField } from "./EditPostStyles";
import { axiosInstance } from "../../axios";
import AuthContext from "../Login/AuthContext";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    event.preventDefault();
    setBody(event.target.value);
  };

  const handlePost = async (event) => {
    event.preventDefault();
    // try {
    //   await axiosInstance.post("blog/createpost", {
    //     title: title,
    //     body: body,
    //     withCredentials: true,
    //   });
    //   navigate(`/user/posts/${user.user.id}`);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  return (
    <>
      <NavBar />
      <Box>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Edit the Post
        </Typography>
      </Box>
      <PostInputWrapper>
        <InputField label="Title" onChange={handleTitleChange} />
        <InputField
          multiline
          maxRows={Infinity}
          label="Body"
          onChange={handleBodyChange}
        />
      </PostInputWrapper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handlePost}>
          Post
        </Button>
      </Box>
    </>
  );
};

export default EditPost;
