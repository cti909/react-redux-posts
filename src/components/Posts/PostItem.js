import React, { useState } from "react";
import PostActions from "./PostActions";
import ButtonDelete from "../public/ButtonDelete";
import ButtonEdit from "../public/ButtonEdit";
import { useDispatch, useSelector } from "react-redux";
import { DeletePosts } from "../../store/actions/PostActions";
import { DELETE_POST_SUCCESS } from "../../constants/ActionConstant";
import { Image } from "react-bootstrap";
import "../../assets/css/image.css";
import { Link, useNavigate } from "react-router-dom";
import { MEDIA_URL } from "../../constants/config";

function PostItem(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const column = useSelector((state) => state.posts.sort.column);
  const sortType = useSelector((state) => state.posts.sort.sortType);
  const search = useSelector((state) => state.posts.sort.search);

  // xoa 1 note
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

  // hien thi edit form va button save - cancel
  const handleClickEdit = (postId, content) => {
    navigate(`/posts/${postId}/edit`);
  };

  return (
    <div className="border shadow p-2 mb-3 bg-body rounded post-item">
      <div className="d-flex align-items-center">
        <h5 className="me-2">{props.item.creator_name}</h5>
        <span className="text-muted me-2">|{props.item.updated_at}</span>
        {props.item.updated_at !== props.item.created_at && (
          <span> |Edited</span>
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
      <h1>{props.item.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: props.item.content }} />
      {props.item.photo && (
        <Link className="focus-link" to={`/image/${props.item.photo}`}>
          <Image
            className="image-display image-thumbnail"
            src={`${MEDIA_URL}${props.item.photo}`}
            alt="loading"
          />
        </Link>
      )}
      <br className="border mt-3 mb-2" />
      <PostActions
        userId={userId}
        postId={props.item.id}
        isLiked={props.item.is_liked}
        likesCount={props.item.likes_post_count}
        creatorId={props.item.creator_id}
        commentsCount={props.item.comments_count}
      />
    </div>
  );
}

export default PostItem;
