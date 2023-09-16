import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import ACard from "../../Components/Card/ACard";
import { Cover } from "./SearchResultsPageStyles";
import {
  BlogsContainer,
  BlogTitle,
  GridContainer,
} from "./SearchResultsPageStyles";
import { axiosInstance } from "../../axios";

const SearchResultsPage = () => {
  const [posts, setPosts] = useState([]);
  const { query } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(
          `blog/allposts?search=${query}`
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [query]);

  return (
    <>
      <NavBar />
      <BlogsContainer maxWidth="lg">
        <BlogTitle variant="h4">Search Results for: '{query}'</BlogTitle>
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

export default SearchResultsPage;
