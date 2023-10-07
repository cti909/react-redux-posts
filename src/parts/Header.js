import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Image,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import logo from "../logo.svg";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { SetIsLogin, SetUser, setUser } from "../store/actions/AuthActions";

function Header(prop) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // if (localStorage.getItem("accessToken")) dispatch(SetIsLogin());
    if (isLoggedIn || localStorage.getItem("accessToken") && Object.keys(user).length === 0) dispatch(SetUser());
  }, []);

  const handleClickHome = (event) => {
    event.preventDefault();
    navigate("/");
  };
  const handleClickPosts = (event) => {
    event.preventDefault();
    navigate("/posts");
  };
  const handleClickRegister = (event) => {
    event.preventDefault();
    navigate("/register");
  };
  const handleClickLogin = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  const handleClickMyAccount = (event) => {
    event.preventDefault();
    navigate("/user");
  };
  const handleClickMyPosts = (event) => {
    event.preventDefault();
    navigate("/posts/me");
  };
  const handleClickLogout = (event) => {
    event.preventDefault();
    navigate("/logout");
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image src={logo} className="App-logo" alt="logo" />
          Blogs
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" onClick={handleClickHome}>
              Home
            </Nav.Link>
            <Nav.Link href="/posts" onClick={handleClickPosts}>
              Posts
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <>
                <div className="d-flex align-items-center">
                  <span className="text-white">{user.name}</span>
                </div>
                <NavDropdown
                  title={<FontAwesomeIcon icon={faGear} spin />}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    href="/auth/me"
                    onClick={handleClickMyAccount}
                  >
                    My account
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/posts/me"
                    onClick={handleClickMyPosts}
                  >
                    My post
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">Setting</NavDropdown.Item>
                  <NavDropdown.Item href="#">Help</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout" onClick={handleClickLogout}>
                    <Button className="w-100" variant="primary">
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/register" onClick={handleClickRegister}>
                  <Button className="w-100" variant="primary">
                    Register
                  </Button>
                </Nav.Link>
                <Nav.Link href="/login" onClick={handleClickLogin}>
                  <Button className="w-100" variant="primary">
                    Login
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
