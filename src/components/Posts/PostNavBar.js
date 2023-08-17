import React, { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../assets/css/buttonCustom.css";

function PostNavBar(prop) {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user.id);
  const handleClickNewPost = (e) => {
    e.preventDefault();
    if (userId) {
      navigate("/posts/add");
    } else {
      const result = window.confirm("You must login for feature!");
      if (result) {
        navigate("/login");
      }
    }
  };
  return (
    <Navbar className="border shadow">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="d-flex justify-content-between"
        >
          <Nav></Nav>
          <Nav>
            <Nav.Link
              className="button-p-0"
              href="/posts/add"
              onClick={handleClickNewPost}
            >
              <Button variant="primary">New post</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PostNavBar;
