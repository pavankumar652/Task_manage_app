import React from "react";
import { Container, Stack, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = ({ user, isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );

      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">PROFILE</h2>

      <Stack
        gap={4}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          padding: "30px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <Stack direction="horizontal" gap={3}>
          <strong>Name:</strong>
          <span>{user?.name || "N/A"}</span>
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <strong>Email:</strong>
          <span>{user?.email || "N/A"}</span>
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <strong>Phone:</strong>
          <span>{user?.phone || "N/A"}</span>
        </Stack>

        <Stack direction="horizontal" gap={3}>
          <strong>Joined:</strong>
          <span>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </Stack>

        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </Container>
  );
};

export default Profile;