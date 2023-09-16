import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActions, Box } from "@mui/material";
import styled from "@emotion/styled";

export const OneCard = styled(Card)`
  max-width: 100%;
`;

export const Media = styled(CardMedia)`
  height: 240;
  object-fit: contain;
`;

export const ACardActions = styled(CardActions)`
  display: flex;
  margin: 0 10px;
  justify-content: space-between;
`;

export const Author = styled(Box)`
  display: flex;
`;
