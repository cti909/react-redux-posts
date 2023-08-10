import React, { useState } from "react";
import PropTypes from "prop-types";
import PostActions from "./PostActions";
import ButtonDelete from "../public/ButtonDelete";
import ButtonEdit from "../public/ButtonEdit";
import ButtonSave from "../public/ButtonSave";
import ButtonCancel from "../public/ButtonCancel";
import { useDispatch, useSelector } from "react-redux";
import { DeletePosts, EditPosts } from "../../store/actions/PostActions";
import { UPDATE_POST_SUCCESS } from "../../constants/ActionConstant";
import { Form, Image } from "react-bootstrap";
import "../../assets/css/image.css";
import { Link, useNavigate } from "react-router-dom";
import { MEDIA_URL } from "../../constants/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faShare } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faRegularThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faSolidThumbsUp } from "@fortawesome/free-solid-svg-icons";

function PostReview(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const [PostIdEdit, setPostIdEdit] = useState(0);
  const [contentEdit, setContentEdit] = useState("");
  const [photoEdit, setPhotoEdit] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    `${MEDIA_URL}${props.item.photo}`
  );
  let sortType = props.sortType || "desc";
  let column = props.column || "updatedAt";
  let search = props.search || "";
  // xoa 1 note
  const handleClickDelete = (post_id) => {
    console.log("delete click", post_id);
    const result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      dispatch(DeletePosts(post_id, sortType, column, search, userId));
    }
  };

  // hien thi edit form va button save - cancel
  const handleClickEdit = (post_id, content) => {
    console.log(content);
    let text_field = content.replace("<br/>", "\n");
    setPostIdEdit(post_id);
    setContentEdit(text_field);
    props.item.photo
      ? setImagePreview(`${MEDIA_URL}${props.item.photo}`)
      : setImagePreview(null);
  };

  // luu note vua chinh sua
  const handleClickSave = (postId) => {
    const result = window.confirm("Are you want update this post?");
    if (result) {
      let value = contentEdit.replace(/\n/g, "<br/>");
      dispatch(EditPosts(value, photoEdit, postId, userId))
        .then((res) => {
          console.log(res);
          if (res === UPDATE_POST_SUCCESS) {
            alert("Update this post success!");
            setPostIdEdit(0);
            setContentEdit("");
            setPhotoEdit(null);
          } else {
            alert("Updated this post failed!");
          }
        })
        .catch((error) => {});
    }
  };

  // huy edit form
  const handleClickCancel = (post_id) => {
    setPostIdEdit(0);
    setImagePreview(null);
  };
  return (
    <div className="border shadow p-2 mb-3 bg-body rounded post-item">
      <div className="d-flex align-items-center">
        <h5 className="me-2">{props.item.creator_name}</h5>
        <span className="text-muted">|{props.item.updated_at}</span>
        {props.item.updated_at !== props.item.created_at && (
          <span>| Edited</span>
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
