import React, { useState } from "react";
import ButtonDelete from "../public/ButtonDelete";
import ButtonEdit from "../public/ButtonEdit";
import { useDispatch, useSelector } from "react-redux";
import { DeletePosts, EditPosts } from "../../store/actions/PostActions";
import { DELETE_POST_SUCCESS } from "../../constants/ActionConstant";
import "../../assets/css/image.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faSolidThumbsUp } from "@fortawesome/free-solid-svg-icons";

function PostReview(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const column = useSelector((state) => state.posts.sort.column);
  const sortType = useSelector((state) => state.posts.sort.sortType);
  const search = useSelector((state) => state.posts.sort.search);

  const handleClickDelete = (postId) => {
    console.log("delete click", postId);
    const result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      dispatch(DeletePosts(postId, sortType, column, search, userId))
        .then((res) => {
          console.log(res);
          if (res === DELETE_POST_SUCCESS) {
            alert("Delete this post success!");
            navigate(`/posts`);
          } else {
            alert("Delete this post failed!");
          }
        })
        .catch((error) => {});
    }
  };
  const handleClickEdit = (postId, content) => {
    navigate(`/posts/${postId}/edit`);
  };

  return (
    <div className="border shadow p-2 mb-3 bg-body rounded post-item">
      <div className="d-flex align-items-center">
        <h5 className="me-2">{props.item.creator_name}</h5>
        <span className="text-muted">|{props.item.updated_at}</span>
        {props.item.updated_at !== props.item.created_at && (
          <span>| Edited</span>
        )}
        {props.item.creator_id === userId && (
          <div className="d-flex ms-3 me-2">
            <div className="me-2">
              <ButtonEdit
                handleClickEdit={() =>
                  handleClickEdit(props.item.id, props.item.content)
                }
              />
            </div>
            <div className="me-2">
              <ButtonDelete
                handleClickDelete={() => handleClickDelete(props.item.id)}
              />
            </div>
          </div>
        )}
      </div>
      <span>
        <Link
          className="focus-link title-review"
          to={`/posts/${props.item.id}`}
        >
          {props.item.title}
        </Link>
      </span>
      <div className="d-flex">
        <div className="me-2">
          <FontAwesomeIcon icon={faSolidThumbsUp} />
          <span className="ms-1">{props.item.likes_post_count} </span>
        </div>
        <div>
          <FontAwesomeIcon className="me-1" icon={faComment} />
          {props.item.comments_count}
        </div>
      </div>
    </div>
  );
}

export default PostReview;
