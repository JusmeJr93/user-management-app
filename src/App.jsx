import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Container, Spinner } from "react-bootstrap";

const LoginPage = lazy(() => import("./pages/Login"));
const RegistrationPage = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));

const App = () => (
  <Suspense
    fallback={
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </Container>
    }
  >
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Suspense>
);

export default App;
