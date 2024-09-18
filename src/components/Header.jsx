/* eslint-disable react/prop-types */
import { Button, Container, FormControl, Navbar } from "react-bootstrap";
import { Form } from "react-router-dom";

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">User Management Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ms-auto">
            <FormControl
              type="search"
              placeholder="Search by name or email"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Navbar.Text>
              Hello, <strong>Junior</strong>!
              <Button variant="outline-danger" className="ms-3">
                Logout
              </Button>
            </Navbar.Text>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
