import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { Alert, Button, Container, Form } from "react-bootstrap";
import "./styles/logreg.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="boxContainer p-4 shadow">
        <h2 className="mb-4 text-center">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </Form.Group>

          <p className="fw-bold">
            If you don&apos;t have an account, first
            <Link
              to="/register"
              title="Go to the registration page"
              className="text-center text-decoration-none ms-1"
            >
              Register
            </Link>
          </p>

          <Button variant="primary" type="submit" className="w-100 btn-custom">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
