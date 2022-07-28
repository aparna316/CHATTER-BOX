import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfilePosts } from "../feature/checkProfile/checkProfileSlice";
import { getProfileInfo } from "../feature/checkProfile/checkProfileSlice";
import PostItem from "./PostItem";

//function
export default function MyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.checkProfileReducer.postList);
  const userInfo = useSelector(
    (state) => state.checkProfileReducer.profileInfo
  );

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }

    if (localStorage.getItem("UserId") !== null) {
      dispatch(getProfilePosts(localStorage.getItem("UserId")));
      dispatch(getProfileInfo(localStorage.getItem("UserId")));
    }
  }, []);
//JSx Part
  return (
    <div>
      <h1>Post</h1>
      {postList !== null ? (
        postList.map((postItem) => {
          return (
            <PostItem key={postItem.id}  postId={postItem.id}  userId={postItem.userId} firstName={userInfo.firstName} lastName={userInfo.lastName}  content={postItem.content}  image={postItem.image}  loveList={postItem.love}  shareList={postItem.share}  commentList={postItem.comment}  postDate={postItem.createdAt} />
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}
 
