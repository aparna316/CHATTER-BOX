import React, { useEffect, useState } from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileId } from "../feature/checkProfile/checkProfileSlice";
import { followAccount } from "../feature/followingAccounts/followingAccountSlice";
import { Button } from "react-bootstrap";

//import icons from react-icons

import { RiCheckFill, RiUserFollowFill } from "react-icons/ri";

 export default function FollowerAccountItem(props) {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(
    (state) => state.checkProfileReducer.profileId
  );
  const storeFollowingAccounts = useSelector(
    (state) => state.followingAccountReducer.followingAccounts
  );

  const [followButtonTitle, setFollowButtonTitle] = useState("Follow");
  const [tickIconStatus, setTickIconStatus] = useState(false);

  function handleFollowButtonClick(e) {
    dispatch(
      followAccount({
        followedId: props.id,
        followerId: localStorage.getItem("UserId"),
      })
    );
    setFollowButtonTitle("Followed");
    setTickIconStatus(true);
  }

  function handleClick(e) {
    dispatch(getProfileId(props.id));
  }

  useEffect(() => {
    if (storeFollowingAccounts !== null) {
      for (let i = 0; i < storeFollowingAccounts.length; i++) {
        if (storeFollowingAccounts[i].id === props.id) {
          setTickIconStatus(true);
          setFollowButtonTitle("Followed");
        }
      }
    }
  }, []);
//JSX Part
  return (
    <div className="d-flex align-items-center my-5">
      <div>
        <Hashicon value={props.id} size={50} />
      </div>
      <div className="mx-3 fw-bold">
        <Link to="/newsfeed/profile" className="text-decoration-none  " style={{color: "white"}}onClick={handleClick} >
          {props.firstName + " " + props.lastName}
        </Link>
      </div>
      <div>
        <Button style={{backgroundColor: "black"}} variant={tickIconStatus ? "primary" : "success"} onClick={handleFollowButtonClick} disabled={tickIconStatus} >
          {followButtonTitle}{" "}
          {tickIconStatus ? <RiCheckFill /> : <RiUserFollowFill />}
        </Button>
      </div>
    </div>
  );
}

 
