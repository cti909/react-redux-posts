// RegisterForm.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Register } from "../../store/actions/AuthActions";
import { useNavigate } from "react-router-dom";
import { REGISTER_FAILED } from "../../constants/ActionConstant";
import { Alert, Button, Form } from "react-bootstrap";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

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
    // console.log(form, errors);
  };

  const rules = () => {
    const { name, email, password, address } = form;
    // console.log(form);
    const newErrors = {};
    if (!name || name === "") newErrors.name = "Name cannot be blank!";
    if (!email || email === "") newErrors.email = "Email cannot be blank!";
    if (!password || password === "")
      newErrors.password = "Password cannot be blank!";
    else if (password.length < 6) newErrors.password = "Password is too short!";
    if (!address || address === "")
      newErrors.address = "Address cannot be blank!";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = rules();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      console.log(form);
      dispatch(Register(form.name, form.email, form.password, form.address))
        .then((res) => {
          if (res === REGISTER_FAILED) {
            alert("Register failed");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(form);
        });
    }
  };

  return (
    // them input upload avatar
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          name="name"
          placeholder="Name"
          onChange={(e) => setField("name", e.target.value)}
          isInvalid={!!errors.name}
          required
        />
        {errors.name && <Alert variant="danger">{errors.name}</Alert>}
      </Form.Group>

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
        {errors.email && <Alert variant="danger">{errors.email}</Alert>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setField("password", e.target.value)}
          isInvalid={!!errors.password}
          required
        />
        {errors.password && <Alert variant="danger">{errors.password}</Alert>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="address"
          name="address"
          placeholder="Address"
          onChange={(e) => setField("address", e.target.value)}
          isInvalid={!!errors.address}
          required
        />
        {errors.address && <Alert variant="danger">{errors.address}</Alert>}
      </Form.Group>

      <Button type="submit" variant="secondary" className="form-control mt-3">
        <strong>Register</strong>
      </Button>
    </Form>
  );
};

export default RegisterForm;
