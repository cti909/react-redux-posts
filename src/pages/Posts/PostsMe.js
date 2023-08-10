import React, { useState, useEffect, useRef } from "react";
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { GetAllMyPosts } from "../../store/actions/PostActions";
import PostsList from "../../components/Posts/PostsList";
import CustomPagination from "../../components/Posts/CustomPagination";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/postAction.css";
import MyPost from "../../components/Posts/PostNavBar";

function PostsMe(props) {
  console.log("re render");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const postsData = useSelector((state) => state.posts.data) ?? null; // data
  const pagination = useSelector((state) => state.posts.pagination);
  const userId = useSelector((state) => state.auth.user.id) || 0;

  const searchParams = new URLSearchParams(location.search);
  let page =
    parseInt(searchParams.get("page")) || parseInt(pagination.currentPage) || 1;
  let categoryId = parseInt(searchParams.get("categoryId")) || 1;
  let column = searchParams.get("column") || "updatedAt";
  let sortType = searchParams.get("sortType") || "desc";
  let search = searchParams.get("search") || "";
  let totalPages = pagination.totalPages || 1;

  // //get data posts
  useEffect(() => {
    dispatch(GetAllMyPosts(userId));
  }, [userId]);

  // chuyen len dau trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const onPageChange = (pageNumber) => {
    console.log(pageNumber);
    navigate(
      `/posts?categoryId=${categoryId}&page=${pageNumber}&column=${column}&sortType=${sortType}&search=${search}`
    );
    scrollToTop();
  };

  const [showGoToTop, setShowGoToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY >= 200);
      console.log("set state");
    };
    window.addEventListener("scroll", handleScroll);
    // clean function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <MyPost />
        <Container className="my-3">
          {/* show note */}
          {postsData && (
            <PostsList
              postsData={postsData}
              column={column}
              sortType={sortType}
              search={search}
            />
          )}
        </Container>
      </main>
      {showGoToTop && (
        <div className="position-fixed back-to-top">
          <Button
            className="rounded-circle"
            onClick={scrollToTop}
            variant="outline-dark"
          >
            <FontAwesomeIcon icon={faArrowUp} />
          </Button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default PostsMe;