import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostAddForm from "./PostForm";
import {} from "../../assets/css/text.css";
import PostItem from "./PostItem";
import PostReview from "./PostReview";

function PostsList(props) {
  console.log("render PostsList");
  const userId = useSelector((state) => state.auth.user.id) ?? 0;
  return (
    <div className="mt-3">
      {props.postsData.length !== 0 ? (
        props.postsData.map((item) => (
          <PostReview
            key={item.id}
            item={item}
            user={userId}
            column={props.column}
            sortType={props.sortType}
            search={props.search}
          />
        ))
      ) : (
        <span className="d-flex justify-content-center text-center">
          No post
        </span>
      )}
    </div>
  );
}

export default PostsList;
