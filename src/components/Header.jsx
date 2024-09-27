/* eslint-disable react/prop-types */
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

const Header = ({
  userData: { userName, userPhoto, setShowProfileModal, logout },
}) => {
  return (
    <Navbar expand="lg" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand href="#" className="d-flex">
          <img src="/group.png" width={50} alt="App Logo" className="me-2" />
          <span className="fs-3  text-dark fw-bold align-self-end">
            AuthMaster
          </span>
        </Navbar.Brand>

        <Navbar.Text className="ms-auto fs-5 fw-bold text-dark align-self-end">
          Hello, <span className="fs-4">{userName}</span>
          <Dropdown className="ms-2 d-inline">
            <Dropdown.Toggle id="dropdown-basic">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  width={40}
                  alt="Profile"
                  className="rounded-circle"
                />
              ) : (
                <FaUserCircle className="fs-3 text-white" />
              )}
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item
                className="text-black"
                onClick={() => setShowProfileModal(true)}
              >
                Edit Profile
              </Dropdown.Item>
              <Dropdown.Item className="text-black" onClick={logout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Header;
