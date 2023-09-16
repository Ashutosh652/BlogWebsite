import React from "react";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Avatar, Box } from "@mui/material";
import { OneCard, Media, ACardActions, Author } from "./ACardStyles";
import { axiosInstance } from "../../axios";
import { timeSince } from "../../formatDate";

const ACard = ({ post }) => {
  const navigate = useNavigate();

  const handlePostClick = async (event) => {
    event.preventDefault();
    navigate(`/blog/${post.id}`);
  };

  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }

  return (
    <OneCard>
      <CardActionArea onClick={handlePostClick}>
        {post ? (
          <Media sx={{ height: 140 }} image={post.pic} />
        ) : (
          <Media sx={{ height: 140 }} />
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {truncate(post.title, 31)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncate(post.body, 50)}
          </Typography>
        </CardContent>
        <ACardActions>
          <Author>
            <Avatar src="https://images.pexels.com/photos/16628785/pexels-photo-16628785/free-photo-of-fashion-love-woman-dark.jpeg?auto=compress&cs=tinysrgb&w=600" />
            <Box ml={2}>
              <Typography variant="subtitle2" component="p">
                {post.author_name}
              </Typography>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                component="p"
              >
                {timeSince(new Date(post.last_updated))} ago
              </Typography>
            </Box>
          </Author>
        </ACardActions>
      </CardActionArea>
    </OneCard>
  );
};

export default ACard;
