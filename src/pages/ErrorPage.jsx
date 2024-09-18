import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Container className="d-flex flex-column vh-100 justify-content-center align-items-center">
      <h2 className="fs-1">404 Error</h2>
      <p className="text-info fs-4">Page not found.</p>
      <p>
        Go to the
        <Link to="/" className="fw-bold d-inline mx-1 text-decoration-none">
          Login
        </Link>
        Page
      </p>
    </Container>
  );
};

export default ErrorPage;
