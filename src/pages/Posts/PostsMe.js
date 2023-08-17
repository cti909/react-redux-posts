import React, { useState, useEffect } from "react";
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAllPosts } from "../../store/actions/PostActions";
import PostsList from "../../components/Posts/PostsList";
import CustomPagination from "../../components/Posts/CustomPagination";
import FilterPosts from "../../components/Posts/FilterPosts";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/postAction.css";
import PostNavBar from "../../components/Posts/PostNavBar";
import { scrollToTop } from "../../utils/scrollToTop";

function PostsHome(props) {
  console.log("re render");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const postsData = useSelector((state) => state.posts.data) ?? null; // data
  const pagination = useSelector((state) => state.posts.pagination);
  const userId = useSelector((state) => state.auth.user.id) || 0;
  const [showGoToTop, setShowGoToTop] = useState(false);

  // //get data posts
  useEffect(() => {
    let isMe = true;
    dispatch(GetAllPosts(userId, isMe));
  }, [userId]);

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
        <PostNavBar />
        <Container className="my-3">
          <FilterPosts />
          {postsData && <PostsList />}
          <div className="d-flex justify-content-center">
            <CustomPagination />
          </div>
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

export default PostsHome;
