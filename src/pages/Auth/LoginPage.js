import React, { useRef, useState } from "react";
import background_login from "../../assets/images/background_login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Login } from "../../store/actions/AuthActions";
import { LOGIN_SUCCESS } from "../../constants/ActionConstant";
import LoginForm from "../../components/Auth/LoginForm";

function LoginPage(props) {
  const navigate = useNavigate();
  const handleClickRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const handleClickHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <section
      style={{
        backgroundImage: `url(${background_login})`,
        height: "100vh",
      }}
    >
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem", opacity: 0.8 }}
            >
              <div className="card-body p-5">
                <div className="mb-md-5 mt-md-4 pb-3">
                  <h1 className="fw-bold mb-2 text-uppercase text-center">
                    Login
                  </h1>
                  <p className="text-white-50 mb-4 text-center">
                    Please enter your login and password!
                  </p>

                  <LoginForm />

                  <div className="d-flex justify-content-between mt-2">
                    <Link className="text-white-50" href="#">
                      Forgot password?
                    </Link>
                    <Link
                      className="text-white-50"
                      href="/"
                      onClick={handleClickHome}
                    >
                      Back to home
                    </Link>
                  </div>
                </div>
                <div>
                  <p className="text-center">
                    You have an account?
                    <Link
                      href="/register"
                      className="ms-1 text-white-50 fw-bold"
                      onClick={handleClickRegister}
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
