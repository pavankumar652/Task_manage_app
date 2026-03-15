import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

const UpdateTaskModal = ({ showUpdateModal, handleUpdateClose, id, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [archived, setArchived] = useState(false);

  // 🔹 Get Single Task Data
  useEffect(() => {
    const getSingleTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/task/single/${id}`,
          { withCredentials: true }
        );

        const task = res.data.task;

        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setArchived(task.archived);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };

    if (id && showUpdateModal) {
      getSingleTask();
    }
  }, [id, showUpdateModal]);

  // 🔹 Update Task Function
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:4000/api/v1/task/update/${id}`,
        {
          title,
          description,
          status,
          archived,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // Update task list in parent
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? res.data.task : task
        )
      );

      handleUpdateClose();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <Modal show={showUpdateModal} onHide={handleUpdateClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Task</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleUpdateTask}>
        <Modal.Body>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </Form.Group>

          <Form.Check
            type="checkbox"
            label="Archived"
            checked={archived}
            onChange={(e) => setArchived(e.target.checked)}
          />

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update Task
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateTaskModal;