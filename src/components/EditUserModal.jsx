/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import api from "../utils/api";

const EditUserModal = ({ show, handleClose, user, onUserUpdated }) => {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [status, setStatus] = useState(user.status || "active");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setStatus(user.status || "active");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await api.put(`/users/${user.id}`, {
        name,
        email,
        status,
      });
      onUserUpdated(response.data);
      handleClose();
    } catch (error) {
      setError(error.response?.data?.error || "Error updating user.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Form.Group controlId="formName" className="mb-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group controlId="formStatus" hidden>
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
