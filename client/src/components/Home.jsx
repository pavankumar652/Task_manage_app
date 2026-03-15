import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { Card, Button, Stack } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import CreateTaskModal from "../components/CreateTaskModal";
import UpdateTaskModal from "../components/UpdateTaskModal";
import ViewTaskModal from "../components/ViewTaskModal";

const Home = ({
  setTasks,
  tasks,
  isAuthenticated,
  setIsAuthenticated,
  taskType,
}) => {
  const [user, setUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTaskId, setViewTaskId] = useState("");
  const [updateTaskId, setUpdateTaskId] = useState("");

  // Fetch logged in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          { withCredentials: true }
        );

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch user"
        );
        setIsAuthenticated(false);
      }
    };

    if (isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, setIsAuthenticated]);

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/task/delete/${id}`,
        { withCredentials: true }
      );

      toast.success(data.message);

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  };

  // Modal Handlers
  const handleCreateModalClose = () => setShowCreateModal(false);
  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleViewModalClose = () => setShowViewModal(false);

  const handleCreateModalShow = () => setShowCreateModal(true);

  const handleUpdateModalShow = (id) => {
    setUpdateTaskId(id);
    setShowUpdateModal(true);
  };

  const handleViewModalShow = (id) => {
    setViewTaskId(id);
    setShowViewModal(true);
  };

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container my-4">

      {user && <h3 className="mb-3">Welcome, {user.name}!</h3>}

      <div className="row mb-3 d-flex">
        <h1 style={{ width: "fit-content" }}>
          {taskType || "Tasks"}
        </h1>

        <div className="col text-end" style={{ width: "fit-content" }}>
          <Button variant="primary" onClick={handleCreateModalShow}>
            Create Task
          </Button>
        </div>
      </div>

      <div className="row">

        {tasks && tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task._id} className="col-lg-3 col-md-4 col-sm-6">

              <Card
                style={{
                  marginBottom: "20px",
                  minHeight: "400px",
                }}
              >
                <Card.Body className="d-flex justify-content-between flex-column">

                  <Stack gap={2}>

                    <Card.Title
                      className="mb-2"
                      style={{ height: "50px" }}
                    >
                      {task.title?.length <= 40
                        ? task.title
                        : task.title?.slice(0, 40) + "..."}
                    </Card.Title>

                    <Card.Text>
                      {task.description?.length <= 300
                        ? task.description
                        : task.description?.slice(0, 300) + "..."}
                    </Card.Text>

                  </Stack>

                  <Stack
                    direction="horizontal"
                    gap={2}
                    className="justify-content-end"
                  >
                    <MdEdit
                      className="fs-3"
                      onClick={() =>
                        handleUpdateModalShow(task._id)
                      }
                    />

                    <MdDelete
                      className="fs-3"
                      onClick={() => deleteTask(task._id)}
                    />

                    <FaEye
                      className="fs-3"
                      onClick={() =>
                        handleViewModalShow(task._id)
                      }
                    />
                  </Stack>

                </Card.Body>
              </Card>

            </div>
          ))
        ) : (
          <h2>You Don't Have Any {taskType || "Tasks"}</h2>
        )}

      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        handleCreateModalClose={handleCreateModalClose}
        showCreateModal={showCreateModal}
        setTasks={setTasks}
      />

      {/* Update Task Modal */}
      <UpdateTaskModal
        handleUpdateModalShow={handleUpdateModalShow}
        handleUpdateModalClose={handleUpdateModalClose}
        id={updateTaskId}
        setTasks={setTasks}
      />

      {/* View Task Modal */}
      <ViewTaskModal
        handleViewModalShow={handleViewModalShow}
        handleViewModalClose={handleViewModalClose}
        id={viewTaskId}
      />

    </div>
  );
};

export default Home;