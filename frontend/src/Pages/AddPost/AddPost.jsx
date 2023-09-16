import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { Typography, Box, Button } from "@mui/material";
import { PostInputWrapper, InputField } from "./AddPostStyles";
import { axiosInstance } from "../../axios";
import AuthContext from "../Login/AuthContext";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let formData = new FormData();

  const handleTitleChange = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    event.preventDefault();
    setBody(event.target.value);
  };

  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };

  const handlePost = async (event) => {
    event.preventDefault();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("pic", image);
    try {
      // await axiosInstance.post("blog/createpost", {
      //   title: title,
      //   body: body,
      //   withCredentials: true,
      // });
      await axiosInstance.post("blog/createpost", formData);
      navigate(`/user/posts/${user.user.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <NavBar />
      <Box>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Make a new Post
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
        <InputField type="file" accept="image/*" onChange={handleImageUpload} />
      </PostInputWrapper>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={handlePost}>
          Post
        </Button>
      </Box>
    </>
  );
};

export default AddPost;
