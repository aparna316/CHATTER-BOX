import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hashicon } from "@emeraldpay/hashicon-react";
import { useDispatch, useSelector } from "react-redux";
import {getFollowingPosts} from "../feature/followingPost/followingPostSlice";

export default function PostCompose() {
  const dispatch = useDispatch();
  const storeFollowingPosts = useSelector((state) => state.followingPostReducer.followingPosts);
  const [userFullname, setUserFullname] = useState(
    localStorage.getItem("UserFirstName") +
      " " +
      localStorage.getItem("UserLastName")
  );
  const [userId, setUserId] = useState(localStorage.getItem("UserId"));
  const [postContent, setPostContent] = useState("");
  const [postContentCount, setPostContentCount] = useState(0);
  const [disablePostButton, setDisablePostButton] = useState(true);
  const [file, setFile] = useState(null);
  const [file64String, setFile64String] = useState(null);
  const [file64StringWithType, setFile64StringWithType] = useState(null);
  
  function showSuccessMessage(inputMessage) {
    toast.success(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function showFailMessage(inputMessage) {
    toast.error(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function handleContentChange(e) {
    setPostContent(e.target.value);
    setPostContentCount(e.target.value.length);
    if (postContentCount === 0 || postContentCount > 200) {
      setDisablePostButton(true);
    } else {
      setDisablePostButton(false);
    }
  }

  async function createPost(inputContent) {
    try {
      const response = await axios({
        method: "post",
        url: "/api/v1/insertpost",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
        data: {
          id: null,
          userId: localStorage.getItem("UserId"),
          content: inputContent,
          image: file64StringWithType,
          createdAt: null,
          love: null,
          share: null,
          comment: null,
        },
      });

      if (response.data !== null && response.data.status === "success") {
        showSuccessMessage("Posted successfully!");
        setPostContent("");
        setPostContentCount(0);
        setDisablePostButton(true);
        setFile64String(null);
        setFile64StringWithType(null);
      }

      if (response.data !== null && response.data.status === "fail") {
        showFailMessage("Post failed. Please try again later!");
      }
    } catch (error) {
      showFailMessage("Post failed. Please try again later!");
    }
  }


  function onUploadFileChange(e) {
    setFile64String(null);
    if (e.target.files < 1 || !e.target.validity.valid) {
      return;
    }

    compressImageFile(e);
  }

  function fileToBase64(file, cb) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  }

  async function compressImageFile(event) {
    const imageFile = event.target.files[0];

    const options = {
      maxWidthOrHeight: 250,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      // input file is compressed in compressedFile 

      fileToBase64(compressedFile, (err, result) => {
        if (result) {
          setFile(result);
          
          setFile64StringWithType(result);
          setFile64String(String(result.split(",")[1]));
        }
      });
    } catch (error) {
      setFile64String(null);
   
    }
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    createPost(postContent);
    dispatch(getFollowingPosts());
  }
//JSX part
  return (
    <div>
      <div className="border rounded-3 border-success p-3 shadow" style={{color: "white",borderColor:"white"}}>
        <ToastContainer />
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3">
            <Form.Label>
              <div className="d-flex align-items-center mb-1">
                <div className="mx-3">
                  <Hashicon value={userId} size={60} />
                </div>
                <div className="fs-4 fw-bold">{userFullname}</div>
              </div>
            </Form.Label>
            <Form.Control as="textarea" row={4} placeholder="What is happening?" value={postContent} onChange={handleContentChange} style={{ resize: "none", height: "7rem",borderColor:"white"}} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" accept=".jpg, .jpeg, .png" onChange={onUploadFileChange} />
          </Form.Group>
          <div className="d-flex justify-content-end align-items-center">
            <span>Characters: {postContentCount}/200</span>
            <Button onClick={handleCreatePost} variant="success" disabled={disablePostButton} className="col-2 mx-3" style={{color:"white",backgroundColor: "black",borderColor:"white"}}>
              Post
            </Button>
          </div>
        </Form>
        {file64String !== null ? (
          <img src={file64StringWithType} alt="chosen" />
        ) : (
          <span></span>
        )}
      </div>
    </div>
  );
}
 