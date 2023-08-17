import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "../../assets/css/text.css";
import PostReview from "./PostReview";

function PostsList() {
  console.log("render PostsList");
  const userId = useSelector((state) => state.auth.user.id);
  const postData = useSelector((state) => state.posts.data);
  const column = useSelector((state) => state.posts.sort.categoryId);
  const sortType = useSelector((state) => state.posts.sort.sortType);
  const search = useSelector((state) => state.posts.sort.search);
  return (
    <div className="mt-3">
      {postData.length !== 0 ? (
        postData.map((item) => <PostReview key={item.id} item={item} />)
      ) : (
        <span className="d-flex justify-content-center text-center">
          No post
        </span>
      )}
    </div>
  );
}

export default PostsList;
