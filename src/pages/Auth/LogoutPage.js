import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Logout } from "../../store/actions/AuthActions";
import { useNavigate } from "react-router-dom";

function LogoutPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(Logout());

  useEffect(() => {
    navigate("/");
  }, []);
  return <></>;
}

export default LogoutPage;
