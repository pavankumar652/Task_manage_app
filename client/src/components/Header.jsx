import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

function Header({ setTasks, tasks, setIsAuthenticated, isAuthenticated, setTasktype }) {
  const [allTasks, setAllTasks] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/task/mytask",
        { withCredentials: true }
      );

      setAllTasks(data.tasks);
      setTasks(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );

      toast.success(data.message);
      navigateTo("/login");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const filterTasks = (filterType) => {
    let filtered = [];

    switch (filterType) {
      case "completed":
        filtered = allTasks.filter(
          (task) => task.status === "completed"
        );
        setTasktype("Completed Tasks!");
        break;

      case "incomplete":
        filtered = allTasks.filter(
          (task) => task.status === "incomplete"
        );
        setTasktype("InComplete Tasks!");
        break;

      case "archived":
        filtered = allTasks.filter(
          (task) => task.archived === true
        );
        setTasktype("Archived Tasks!");
        break;

      case "all":
        filtered = allTasks;
        setTasktype("Tasks!");
        break;
        
      default:
        filtered = allTasks;
    }

    setTasks(filtered);
  };

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary ${
        !isAuthenticated ? "d-none" : ""
      }`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Task Management
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            <Link
              to="/"
              className="text-decoration-none d-flex align-items-center me-3"
            >
              Home
            </Link>

            <NavDropdown title="Filter Task" id="basic-nav-dropdown">
              <NavDropdown.Item
                onClick={() => filterTasks("all")}
              >
                All Tasks
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => filterTasks("completed")}
              >
                Completed Tasks
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => filterTasks("incomplete")}
              >
                Incomplete Tasks
              </NavDropdown.Item>

              <NavDropdown.Item
                onClick={() => filterTasks("archived")}
              >
                Archived Tasks
              </NavDropdown.Item>
            </NavDropdown>

            <Link
              to="/profile"
              className="text-decoration-none d-flex align-items-center me-3"
            >
              Profile
            </Link>

            <Button
              className="bg-transparent border-0"
              style={{ width: "fit-content" }}
              onClick={handleLogout}
            >
              Logout
            </Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;