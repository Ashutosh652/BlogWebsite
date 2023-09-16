import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Button } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import ACard from "../../Components/Card/ACard";
import { Cover } from "./MyPageStyles";
import { BlogsContainer, BlogTitle, GridContainer } from "./MyPageStyles";
import { axiosInstance } from "../../axios";
import AuthContext from "../Login/AuthContext";

const MyPage = () => {
  const { userid } = useParams();
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`blog/myposts/${userid}`);
        setPosts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [userid]);

  const handleAddPostClick = (event) => {
    event.preventDefault();
    navigate("/user/post/add");
  };

  return (
    <>
      <NavBar />
      <Cover>
        <Box>React Blog</Box>
      </Cover>
      <BlogsContainer maxWidth="lg">
        {user.user.id === Number(userid) ? (
          <Box sx={{ display: "flex", marginBottom: "0.5em" }}>
            <BlogTitle variant="h4">My Articles</BlogTitle>
            <Button
              variant="outlined"
              sx={{ width: "10em" }}
              onClick={handleAddPostClick}
            >
              New Post
            </Button>
          </Box>
        ) : null}
        <GridContainer>
          <Grid container spacing={3}>
            {posts.length > 0 ? (
              <>
                {posts.map((post) => {
                  return (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                      <ACard post={post} />
                    </Grid>
                  );
                })}
              </>
            ) : (
              <h1 style={{ color: "black" }}>Loading...</h1>
            )}
          </Grid>
        </GridContainer>
      </BlogsContainer>
    </>
  );
};

export default MyPage;
