import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Stack, Spinner } from "react-bootstrap";

const ViewTaskModal = ({ show, onClose, id }) => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/task/single/${id}`,
          { withCredentials: true }
        );
        setTask(res.data.task);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      setTask(null); // Reset task when ID changes
      getSingleTask();
    }
  }, [id]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>View Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading && (
          <div className="text-center my-3">
            <Spinner animation="border" />
          </div>
        )}

        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && task && (
          <Stack gap={3}>
            <div>
              <strong>Title:</strong> {task.title}
            </div>

            <div>
              <strong>Description:</strong> {task.description}
            </div>

            <div>
              <strong>Status:</strong>{" "}
              {task.status
                ? task.status.charAt(0).toUpperCase() + task.status.slice(1)
                : "-"}
            </div>

            <div>
              <strong>Created At:</strong>{" "}
              {task.createdAt
                ? new Date(task.createdAt).toLocaleString()
                : "-"}
            </div>
          </Stack>
        )}

        {!loading && !error && !task && <p>No task data available.</p>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewTaskModal;