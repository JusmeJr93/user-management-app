import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Alert, Button, Container, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
    <Container className="d-flex flex-column align-items-center min-vh-100">
      <div className="d-flex flex-column align-items-center pt-3 my-5">
        <img
          src="/group.png"
          alt="App Icon"
          style={{ width: "80px", height: "80px" }}
        />
        <h1 className="fs-3 fw-bold mt-2">AuthMaster</h1>
      </div>

      <div className="boxContainer p-4 shadow">
        <h2 className="mb-4 text-center">Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-4">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Enter your email"
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
                aria-label="Enter your password"
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
            If you don&apos;t have an account,
            <Link
              to="/register"
              title="Go to the registration page"
              className="text-decoration-none ms-1"
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
