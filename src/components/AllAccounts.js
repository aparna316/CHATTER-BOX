import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowerAccountItem from "./FollowerAccountItem";

export default function AllAccounts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowerAccounts = useSelector(
    (state) => state.followingAccountReducer.followerAccounts
  );
//If token is null then redirect to blank page
  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }
    dispatch(getAllAccounts());
  }, []);
//User Accounts
  return (
    <div>
      <h1 style={{color: "white"}}>ChatterBox Users</h1>
      {storeFollowerAccounts ? (
        storeFollowerAccounts.map((followerAccount) => {
          return (
            <FollowerAccountItem key={followerAccount.id}  id={followerAccount.id}  firstName={followerAccount.firstName}  lastName={followerAccount.lastName} />);
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}
  
