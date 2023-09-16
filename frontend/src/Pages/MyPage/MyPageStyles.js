import { styled, Box, Container } from "@mui/material";

export const Cover = styled(Box)(({ theme }) => ({
  backgroundImage:
    'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1600304894683-cd9731d4e0eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9yaXpvbnRhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60")',
  height: "500px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  fontSize: "4rem",
  [theme.breakpoints.down("sm")]: {
    height: 300,
    fontSize: "3em",
  },
}));

export const BlogsContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

export const BlogTitle = styled(Container)(({ theme }) => ({
  fontWeight: 800,
  paddingBottom: theme.spacing(3),
}));

export const GridContainer = styled(Box)`
  margin-bottom: 2rem;
  /* border: 2px solid red; */
  width: 100%;
`;
