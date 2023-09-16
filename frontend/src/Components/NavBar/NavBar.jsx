import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
  TextField,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import { MyAppBar, Login } from "./NavBarStyles";
import AuthContext from "../../Pages/Login/AuthContext";
import { axiosInstance } from "../../axios";

const NavBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    navigate("/logout");
  };

  const handleRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };

  const handleMyPageClick = (event) => {
    event.preventDefault();
    navigate(`/user/posts/${user.user.id}`);
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyDown = async (event) => {
    if (event.key === "Enter") {
      console.log(searchQuery);
      navigate(`/search/${searchQuery}`);
      // try {
      //   const response = await axiosInstance.get(
      //     `blog/allposts?search=${searchQuery}`
      //   );
      //   console.log(response.data);
      // } catch (error) {
      //   console.log(error.message);
      // }
    }
  };

  return (
    <MyAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Menu Item 1</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Menu Item 2</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Menu Item 1
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Menu Item 2
            </Button>
          </Box>
          <Box sx={{ marginRight: "55rem" }}>
            <TextField
              sx={{ backgroundColor: "white" }}
              label="Search"
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {user ? (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography sx={{ color: "white", marginRight: "1em" }}>
                    {user && user.user.user_name}
                  </Typography>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://i0.wp.com/christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg?ssl=1"
                  />{" "}
                </IconButton>
              ) : (
                <>
                  <Login variant="h5" component="a" onClick={handleLogin}>
                    Login
                  </Login>
                  <Login variant="h5" component="a" onClick={handleRegister}>
                    Register
                  </Login>
                </>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              <MenuItem onClick={handleMyPageClick}>
                <Typography textAlign="center">My Page</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </MyAppBar>
  );
};

export default NavBar;
