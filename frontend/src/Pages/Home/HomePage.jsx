import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import ACard from "../../Components/Card/ACard";
import { Cover } from "./HomePageStyles";
import { BlogsContainer, BlogTitle, GridContainer } from "./HomePageStyles";
import { axiosInstance } from "../../axios";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("blog/allposts");
        setPosts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <>
      <NavBar />
      <Cover>
        <Box>React Blog</Box>
      </Cover>
      <BlogsContainer maxWidth="lg">
        <BlogTitle variant="h4">Articles</BlogTitle>
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

export default HomePage;
