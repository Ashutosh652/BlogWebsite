// import styled from "styled-components";
import { styled, Box, Button, TextField } from "@mui/material";

export const PopupBackground = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const PopupCard = styled(Box)`
  position: relative;
  width: 40%;
  background-color: white;
  min-height: 30%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 16px;
  right: 16px;
  /* background-color: red; */
  background: none;
`;

export const InputRow = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5em;
`;

export const InputTitle = styled(Box)`
  font-size: default;
  margin: 0.5em;
`;

export const InputField = styled(TextField)`
  width: 20em;
  margin: 0.5em;
`;

export const UpdateButton = styled(Button)`
  height: 3em;
  width: 5em;
  margin: auto;
`;

export const UpdateButtonWrapper = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  width: 5em;
`;
