import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Container, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/register", { name, email, password });

      localStorage.setItem("token", response.data.token);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during registration."
      );
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center min-vh-100">
      <div className="d-flex flex-column align-items-center  pt-3 my-5">
        <img
          src="/group.png"
          alt="App Icon"
          style={{ width: "80px", height: "80px" }}
        />
        <h1 className="fs-3 fw-bold mt-2">AuthMaster</h1>
      </div>

      <div className="boxContainer p-4 shadow">
        <h2 className="mb-4 text-center">Register</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-4">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <Button
                variant="outline-secondary"
                title={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="d-flex align-items-center"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          <p className="fw-bold">
            Already have an account?
            <Link
              to="/login"
              title="Go to the login page"
              className="text-decoration-none ms-1"
            >
              Log in
            </Link>
          </p>

          <Button variant="primary" type="submit" className="w-100 btn-custom">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default RegistrationPage;
