import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollowingAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowingAccountItem from "./FollowingAccountItem";

//function
export default function FollowingList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowingAccounts = useSelector(
    (state) => state.followingAccountReducer.followingAccounts
  );

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }
    
    dispatch(getFollowingAccounts());
  }, []);
//JSX part
  return (
    <div>
      <h1 style={{color: "white"}}>List OF Following Friends</h1>
      {storeFollowingAccounts ? (
        storeFollowingAccounts.map((followingAccount) => {
          return (
            <FollowingAccountItem  key={followingAccount.id} id={followingAccount.id} firstName={followingAccount.firstName} lastName={followingAccount.lastName}  />
          );
        })
      ) : (
        <span ></span>
      )}
    </div>
  );
}

 
