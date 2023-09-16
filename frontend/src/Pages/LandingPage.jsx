import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import AuthContext from "./Login/AuthContext";

const LandingPage = () => {
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const { user, setUser } = useContext(AuthContext);

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

  return (
    <Box>
      <Typography variant="h1">LandingPage</Typography>
      {!user ? (
        <Button onClick={handleLogin}>Login</Button>
      ) : (
        <Button onClick={handleLogout}>Logout</Button>
      )}
      <Button onClick={handleRegister}>Register</Button>
    </Box>
  );
};

export default LandingPage;
