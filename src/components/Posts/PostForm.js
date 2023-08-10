import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  AddPosts,
  EditPosts,
  GetAllCategories,
  GetDetailPost,
} from "../../store/actions/PostActions";
import "../../assets/css/text.css";
import { useNavigate } from "react-router-dom";
import ButtonAdd from "../public/ButtonAdd";
import ButtonSend from "../public/ButtonSend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ButtonCancel from "../public/ButtonCancel";
import CustomCKEditor from "../public/CustomCKEditor";
import Header from "../../parts/Header";
import { useParams } from "react-router-dom";
import {
  ADD_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
} from "../../constants/ActionConstant";

function PostForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams() ?? 0;

  const userId = useSelector((state) => state.auth.user.id) || 0;
  const categories = useSelector((state) => state.posts.categories) || 0;
  const postDetail = useSelector((state) => state.posts.data[0]) || 0;
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [check, setCheck] = useState(true);

  useEffect(() => {
    dispatch(GetDetailPost(postId, userId));
    dispatch(GetAllCategories());
  }, []);

  useEffect(() => {
    if (userId === postDetail.creator_id) {
      setContent(postDetail.content ?? "");
      setTitle(postDetail.title ?? "");
    } else {
      postId ? setCheck(false) : setCheck(true);
    }
  }, [postDetail]);

  useEffect(() => {
    if (!check) {
      alert("Warning: Something is wrong!!!");
      navigate("/");
    }
  }, [check]);

  const handleSubmit = (e) => {
    console.log("submit");
    e.preventDefault();
    let title = e.target.title.value;
    let categoryId = e.target.category_id.value;
    let action;
    postId ? (action = "updated") : (action = "add");
    if (content !== "" && title !== "") {
      let result = window.confirm(`Are you want ${action} this post?`);
      if (postId) {
        dispatch(EditPosts(title, content, categoryId, postId, userId))
          .then((res) => {
            console.log(res);
            if (res === UPDATE_POST_SUCCESS) {
              alert("Update this post success!");
              navigate(`/posts/${postId}`);
            } else {
              alert("Updated this post failed!");
            }
          })
          .catch((error) => {});
      } else {
        dispatch(AddPosts(title, content, categoryId, userId))
          .then((res) => {
            console.log(res);
            if (res === ADD_POST_SUCCESS) {
              alert("Add this post success!");
              navigate(
                `/posts?categoryId=${categoryId}&page=1&column=updatedAt&sortType=desc&search=`
              );
            } else {
              alert("Add this post failed!");
            }
          })
          .catch((error) => {});
      }
    } else {
      alert("You must enter content and title!");
    }
  };

  const handleChangeContent = (value) => {
    setContent(value);
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <Header />
      <Container className="mt-3">
        <Form
          className="border shadow p-2 bg-body rounded"
          onSubmit={handleSubmit}
        >
          <Form.Group className="d-flex align-items-center mb-3">
            <Form.Label className="me-2 text-margin">Category:</Form.Label>
            <div className="me-2">
              <Form.Select className="d-flex" name="category_id">
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleChangeTitle}
            />
          </Form.Group>
          <CustomCKEditor
            handleChangeContent={handleChangeContent}
            contentData={content}
          />
          <div className="d-flex justify-content-end mt-3">
            <Button className="me-2" type="submit" variant="success">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default PostForm;
