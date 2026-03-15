import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Stack, Form } from "react-bootstrap";

const CreateTaskModal = ({ handleCreateModalClose, showCreateModal, setTasks, refreshTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: ""
  });

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Create Task
  const handleCreate = async () => {
    if (!task.title || !task.description || !task.status) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/task/post",
        task,
        { withCredentials: true }
      );

      alert("Task Created Successfully ✅");

      // Reset form
      setTask({
        title: "",
        description: "",
        status: ""
      });

      // Refresh tasks if function is provided
      if (refreshTasks) refreshTasks();

      // Close modal
      handleCreateModalClose();

    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert("Error creating task");
    }
  };

  return (
    <Modal show={showCreateModal} onHide={handleCreateModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack gap={3}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Stack>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreate}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;