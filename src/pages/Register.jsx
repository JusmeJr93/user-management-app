import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Container, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { getPasswordStrength } from "../utils/passwordStrength";
import { PiSealWarningFill } from "react-icons/pi";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);

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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(getPasswordStrength(newPassword));
  };

  const passwordStrengthIndicator = () => {
    const strengthLabels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
    const strengthColors = ["red", "orange", "#f0cc01", "#09d457", "green"];
    const strengthLabel = strengthLabels[passwordStrength - 1];

    return (
      <div
        className="fw-bold mt-1 ms-1"
        style={{
          color: strengthColors[passwordStrength - 1],
        }}
      >
        {strengthLabel}
      </div>
    );
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
              aria-label="Enter your name"
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
              aria-label="Enter your email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="">
              Password
              <span
                role="button"
                onClick={() => setShowRequirements(!showRequirements)}
                className="mt-2"
              >
                <PiSealWarningFill
                  title={
                    showRequirements ? "Hide requirements" : "Show requirements"
                  }
                  className="fs-5 ms-2 text-warning"
                />
              </span>
            </Form.Label>
            {showRequirements && (
              <p className="text-warning fst-italic">
                Min. 6 chars, lowercase, uppercase, numbers, symbols.
              </p>
            )}
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
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
            {passwordStrengthIndicator()}
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
