import { styled, Box, Container, Typography } from "@mui/material";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

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
  // border: "2px solid green",
  // display: "flex",
  // flexDirection: "column",
  // justifyContent: "start",
}));

export const BlogContent = styled(Container)(({ theme }) => ({
  fontWeight: 300,
  paddingBottom: theme.spacing(3),
  textAlign: "left",
  // border: "2px solid red",
  // width: "fit-content",
  // leftMargin: 0,
}));

export const BlogTitleContainer = styled(Box)`
  margin-bottom: 2rem;
  /* border: 2px solid red; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// export const BlogTitle = styled(Typography)`
//   font-size: large;
//   font-weight: 500;
// `;

export const EditIcon = styled(ModeEditOutlineOutlinedIcon)`
  &:hover {
    cursor: pointer;
  }
  margin-left: 0em;
`;
