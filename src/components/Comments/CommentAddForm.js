import React, { useRef, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddComments } from "../../store/actions/CommentActions";
import "../../assets/css/text.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

function CommentAddForm(props) {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const userId = useSelector((state) => state.auth.user.id);
  console.log("comment add form");

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    let content = e.target.content.value;
    if (content && content !== "\n") {
      content = content.replace(/\n/g, "<br/>");
      dispatch(AddComments(content, "0000", postId, userId));
      e.target.content.value = "";
    } else {
      alert("You must enter content!");
    }
  };

  return (
    <div className="mb-3">
      <Form
        className="border shadow p-2 bg-body rounded"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Comment:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="content"
            placeholder="New comment"
          />
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button className="me-2" type="submit" variant="success">
            <FontAwesomeIcon icon={faPaperPlane} />
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CommentAddForm;
