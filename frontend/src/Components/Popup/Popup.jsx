import React, { useState, useContext } from "react";
import {
  PopupBackground,
  PopupCard,
  CloseButton,
  InputRow,
  InputTitle,
  InputField,
  UpdateButton,
  UpdateButtonWrapper,
} from "./PopupStyles";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { axiosInstance } from "../../axios";

const Popup = ({
  triggerValue,
  editOf,
  setTriggerValue,
  title,
  content,
  postid,
  setPost,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  const handleChange = (event) => {
    if (editOf === "title") {
      setNewTitle(event.target.value);
    }
    if (editOf === "content") {
      setNewContent(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editOf === "title") {
      try {
        const response = await axiosInstance.put(`blog/postedit/${postid}`, {
          title: newTitle,
        });
        setPost(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (editOf === "content") {
      try {
        const response = await axiosInstance.put(`blog/postedit/${postid}`, {
          body: newContent,
        });
        setPost(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    setTriggerValue(false);
  };

  return (
    <>
      {triggerValue ? (
        <PopupBackground>
          <PopupCard>
            <form>
              {editOf === "title" && (
                <InputRow>
                  <InputTitle>Edit Title</InputTitle>
                  <InputField
                    defaultValue={title}
                    onChange={handleChange}
                    name="title"
                  />
                </InputRow>
              )}
              {editOf === "content" && (
                <InputRow>
                  <InputTitle>Edit Content</InputTitle>
                  <InputField
                    multiline
                    maxRows={Infinity}
                    defaultValue={content}
                    onChange={handleChange}
                    name="content"
                  />
                </InputRow>
              )}
              <CloseButton
                type="button"
                onClick={() => {
                  setTriggerValue(false);
                }}
              >
                <CloseOutlinedIcon />
              </CloseButton>
              <UpdateButtonWrapper>
                <UpdateButton onClick={handleSubmit}>Update</UpdateButton>
              </UpdateButtonWrapper>
            </form>
          </PopupCard>
        </PopupBackground>
      ) : (
        ""
      )}
    </>
  );
};

export default Popup;
