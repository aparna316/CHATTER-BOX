import React, { useState } from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileId } from "../feature/checkProfile/checkProfileSlice";
import { unfollowAccount } from "../feature/followingAccounts/followingAccountSlice";
//react icon imported
import { RiCheckFill, RiDeleteBin6Line } from "react-icons/ri";
//bootstrap comp. imported
import { Button } from "react-bootstrap";


export default function FollowingAccountItem(props) {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(
    (state) => state.checkProfileReducer.profileId
  );
  const [followButtonTitle, setFollowButtonTitle] = useState("Unfollow");
  const [tickIconStatus, setTickIconStatus] = useState(false);

  function handleFollowButtonClick(e) {
    dispatch(
      unfollowAccount({
        followedId: props.id,
        followerId: localStorage.getItem("UserId"),
      })
    );
    setFollowButtonTitle("Unfollowed");
    setTickIconStatus(true);
  }

  function handleClick(e) {
    dispatch(getProfileId(props.id));
  }
//JSX Part
  return (
    <div className="d-flex align-items-center my-5" >
      <div>
        <Hashicon value={props.id} size={50} />
      </div>
      <div className="mx-3 fw-bold">
        <Link to="/newsfeed/profile" className="text-decoration-none "style={{color: "white"}} onClick={handleClick} > {props.firstName + " " + props.lastName}
        </Link>
      </div>
      <div>
        <Button style={{backgroundColor: "black"}} variant={tickIconStatus ? "danger" : "success"} onClick={handleFollowButtonClick} > {followButtonTitle}{" "} {tickIconStatus ? <RiCheckFill /> : <RiDeleteBin6Line />} </Button>
      </div>
    </div>
  );
}

 
