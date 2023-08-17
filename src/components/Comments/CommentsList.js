import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { GetAllComments } from "../../store/actions/CommentActions";
import CommentItem from "./CommentItem";
import CommentAddForm from "./CommentAddForm";
import { useParams } from "react-router-dom";

function CommentsList(props) {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.data);
  const userId = useSelector((state) => state.auth.user.id) || 0;
  const [listComments, setListComment] = useState([]);

  useEffect(() => {
    let listCommentsTemp = [...comments];
    let rootComment = [];
    if (comments) {
      let idx = 0;
      while (idx < listCommentsTemp.length) {
        if (listCommentsTemp[idx].path_length === "1") {
          rootComment = [...rootComment, listCommentsTemp[idx]];
          listCommentsTemp.splice(idx, 1);
        } else idx++;
      }

      rootComment.reverse();
      idx = 0;
      let i = listCommentsTemp.length - 1;
      while (i >= 0) {
        if (listCommentsTemp[i].path.includes(rootComment[idx].path)) {
          rootComment.splice(idx + 1, 0, listCommentsTemp[i]);
          i--;
        } else idx++;
      }
      console.log(rootComment);
    }
    setListComment(rootComment);
  }, [comments]);

  useEffect(() => {
    dispatch(GetAllComments(postId, userId));
  }, [userId]);

  return (
    <>
      <div className="border shadow p-2 mb-3 bg-body rounded">
        {userId !== 0 && <CommentAddForm />}
      </div>
      <div className="border shadow p-2 mb-3 bg-body rounded">
        <div className="ig">
          {listComments.length !== 0 ? (
            listComments.map((item) => (
              <div
                key={item.id}
                style={{ marginLeft: 50 * (item.path_length - 1) + "px" }}
              >
                <CommentItem item={item} />
              </div>
            ))
          ) : (
            <span className="d-flex justify-content-center">No comment</span>
          )}
        </div>
      </div>
    </>
  );
}

export default CommentsList;
