import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Register = ({ setIsAuthenticated, isAuthenticated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handlerRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, email, phone, password },
        { withCredentials: true }
      );

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setIsAuthenticated(true);
      toast.success(data.message);
      setRedirectToHome(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (isAuthenticated || redirectToHome) {
    return <Navigate to={"/home"} />;
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "550px" }}>
      <Form onSubmit={handlerRegister} className="w-95">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Already Registered? <Link to={"/login"}>LOGIN</Link>
          </Form.Label>
        </Form.Group>

        <Button variant="warning" type="submit" className="w-100 fw-bold fs-5 text-light">Register</Button>
      </Form>
    </Container>
  );
};

export default Register;