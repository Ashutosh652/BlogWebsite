import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { axiosInstance } from "../../axios";
import AuthContext from "./AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(AuthContext);

  const helperLogin = async () => {
    try {
      const response = await axiosInstance.post("account/login", {
        user_name: userName,
        password: password,
      });
      return [response.data, null];
    } catch (error) {
      return [null, error];
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const [data, error] = await helperLogin();
    if (error) {
      console.log(error.message);
    }
    if (data) {
      console.log(data);
      setUser(data);
      navigate("/");
    }
  };

  return (
    <Box>
      <Typography>Login</Typography>
      <TextField
        label="Username"
        variant="standard"
        onChange={(event) => {
          setUserName(event.target.value);
        }}
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
