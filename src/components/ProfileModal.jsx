/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../services/api";
import { formatDate } from "../utils/formatDate";

const ProfileModal = ({ user, show, onHide, onSave, isAdmin }) => {
  const [profileData, setProfileData] = useState({
    name: "",
    job_title: "",
    department: "",
    hire_date: "",
    email: "",
    phone_number: "",
    gender: "",
    profile_picture: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/users/${user.id}`);
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSave({ ...profileData, id: user.id });
      onHide();
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={isSubmitting ? null : onHide} centered>
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" hidden={!isAdmin}>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="text"
              name="profile_picture"
              value={profileData.profile_picture || ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fullname</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={profileData.name || ""}
              onChange={handleInputChange}
              disabled={!isAdmin}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              name="job_title"
              value={profileData.job_title || ""}
              onChange={handleInputChange}
              disabled={!isAdmin}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              name="department"
              value={profileData.department || ""}
              onChange={handleInputChange}
              disabled={!isAdmin}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hire Date</Form.Label>
            <Form.Control
              type="date"
              name="hire_date"
              value={formatDate(profileData.hire_date || "")}
              onChange={handleInputChange}
              disabled={!isAdmin}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={profileData.email || ""}
              onChange={handleInputChange}
              disabled={!isAdmin}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={profileData.phone_number || ""}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              type="text"
              name="gender"
              value={profileData.gender || ""}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
