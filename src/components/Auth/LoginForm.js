import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Login } from "../../store/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { LOGIN_SUCCESS } from "../../constants/ActionConstant";
import { Button, Form } from "react-bootstrap";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };
  const rules = () => {
    const { email, password } = form;
    const newErrors = {};
    // email errors
    if (!email || email === "") newErrors.email = "cannot be blank!";
    // password errors
    if (!password || password === "") newErrors.password = "cannot be blank!";
    return newErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target.email.value);
    const newErrors = rules();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      console.log(form);
      dispatch(Login(form.email, form.password))
        .then((res) => {
          if (res === LOGIN_SUCCESS) {
            navigate("/");
          } else {
            alert("Email or password is failed");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="name@example.com"
          onChange={(e) => setField("email", e.target.value)}
          isInvalid={!!errors.email}
          required
        />
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        {errors.email}
      </Form.Control.Feedback>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setField("password", e.target.value)}
          isInvalid={!!errors.password}
          required
        />
      </Form.Group>
      <Form.Control.Feedback type="invalid">
        {errors.password}
      </Form.Control.Feedback>

      <Button
        type="submit"
        variant="secondary"
        className="form-control form-control-lg mt-3"
      >
        <strong>Sign in</strong>
      </Button>
    </Form>
  );
};

export default LoginForm;
