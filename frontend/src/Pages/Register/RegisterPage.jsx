import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { axiosInstance } from "../../axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    event.preventDefault();
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleRegisterButton = async (event) => {
    event.preventDefault();
    try {
      await axiosInstance.post("account/register", {
        user_name: userName,
        password: password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      <h1>RegisterPage</h1>
      <TextField
        variant="standard"
        label="Username"
        onChange={handleUsernameChange}
      />
      <TextField
        variant="standard"
        label="Password"
        type="password"
        onChange={handlePasswordChange}
      />
      <Button variant="contained" onClick={handleRegisterButton}>
        Register
      </Button>
    </Box>
  );
};

export default RegisterPage;
