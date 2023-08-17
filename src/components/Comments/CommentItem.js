import React, { useState } from "react";
import ButtonDelete from "../public/ButtonDelete";
import ButtonEdit from "../public/ButtonEdit";
import ButtonSave from "../public/ButtonSave";
import ButtonCancel from "../public/ButtonCancel";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteComments,
  EditComments,
} from "../../store/actions/CommentActions";
import { UPDATE_COMMENT_SUCCESS } from "../../constants/ActionConstant";
import { Form } from "react-bootstrap";
import CommentActions from "./CommentActions";
import { useParams } from "react-router-dom";

function CommentItem(props) {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id) || 0;
  const [CommentIdEdit, setPostIdEdit] = useState(0);
  const [contentEdit, setContentEdit] = useState("");

  // xoa 1 note
  const handleClickDelete = (path, commentId) => {
    console.log("delete click", commentId);
    const result = window.confirm("Are you sure you want to delete this item?");
    if (result) {
      dispatch(DeleteComments(path, commentId, postId, userId));
    }
  };

  // hien thi edit form va button save - cancel
  const handleClickEdit = (commentId, content) => {
    let text_field = content.replace("<br/>", "\n");
    setPostIdEdit(commentId);
    setContentEdit(text_field);
  };

  // luu comment vua chinh sua
  const handleClickSave = (commentId) => {
    if (contentEdit !== "" && contentEdit !== "\n") {
      let value = contentEdit.replace(/\n/g, "<br/>");
      dispatch(EditComments(value, commentId, postId, userId))
        .then((res) => {
          console.log(res);
          if (res === UPDATE_COMMENT_SUCCESS) {
            setPostIdEdit(0);
            setContentEdit("");
          } else {
            alert("Add failed!");
          }
        })
        .catch((error) => {});
    } else {
      alert("You must enter content!");
    }
  };

  // huy edit form
  const handleClickCancel = () => {
    setPostIdEdit(0);
  };

  const handleChangeText = (e) => {
    setContentEdit(e.target.value);
  };

  return (
    <div className="border shadow p-2 mb-3 bg-body rounded">
      <div className="d-flex align-items-center">
        <h5>{props.item.creator_name}</h5>

        {props.item.creator_id === userId && (
          <div className="d-flex ms-3 me-2">
            {CommentIdEdit !== props.item.id ? (
              <>
                <div className="me-2">
                  <ButtonEdit
                    handleClickEdit={() =>
                      handleClickEdit(
                        props.item.id,
                        props.item.content,
                        props.item.photo
                      )
                    }
                  />
                </div>
                <div className="me-2">
                  <ButtonDelete
                    handleClickDelete={() =>
                      handleClickDelete(props.item.path, props.item.id)
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div className="me-2">
                  <ButtonSave
                    handleClickSave={() => handleClickSave(props.item.id)}
                  />
                </div>
                <div className="me-2">
                  <ButtonCancel
                    handleClickCancel={() => handleClickCancel(props.item.id)}
                  />
                </div>
              </>
            )}
          </div>
        )}
        {props.item.updated_at !== props.item.created_at && (
          <span>| Edited</span>
        )}
      </div>
      <span className="text-muted">{props.item.updated_at}</span>
      {CommentIdEdit === props.item.id ? (
        <Form>
          <Form.Group className="mb-3">
            {/* <Form.Label>Content</Form.Label> */}
            <Form.Control
              as="textarea"
              rows={3}
              value={contentEdit}
              onChange={handleChangeText}
            />
          </Form.Group>
        </Form>
      ) : (
        <>
          {props.item.content.split("<br/>").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </>
      )}
      <br className="border mt-3 mb-2" />
      <CommentActions
        commentId={props.item.id}
        path={props.item.path}
        likesCount={props.item.likes_comment_count}
        creatorId={props.item.creator_id}
        isLiked={props.item.is_liked}
      />
    </div>
  );
}

export default CommentItem;
