import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = ({ setIsAuthenticated, isAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setEmail("");
      setPassword("");
      setIsAuthenticated(true);
      toast.success(data.message);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "550px" }}
    >
      <Form onSubmit={handleLogin} className="w-95">

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Not Registered?{" "}
            <Link to={"/register"} className="text-decoration-none">
              REGISTER
            </Link>
          </Form.Label>
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          className="w-100 fw-bold fs-5 text-light"
        >
          LOGIN
        </Button>

      </Form>
    </Container>
  );
};

export default Login;