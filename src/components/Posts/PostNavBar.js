import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/buttonCustom.css";

function PostNavBar(prop) {
  return (
    <Navbar className="border shadow">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/posts/me">My posts</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link className="button-p-0" href="/posts/add">
              <Button variant="primary">New post</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PostNavBar;
