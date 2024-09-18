import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  FormControl,
  Navbar,
  Spinner,
  Table,
} from "react-bootstrap";
import EditUserModal from "../components/EditUserModal";
import api from "../utils/api";
import "./styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { TbLock, TbLockOpen2 } from "react-icons/tb";
import { RiDeleteBin2Line } from "react-icons/ri";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/login");
  };

  useEffect(() => {
    //fetch users from server
    async function fetchUsers() {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
        setFilteredUsers(response.data);

        // Retrieve email from localStorage and find the corresponding user
        const email = localStorage.getItem("email");
        if (email) {
          const user = response.data.find((u) => u.email === email);
          if (user) {
            setUserName(user.name.split(" ")[0]);
            setCurrentUser(user);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  //search user
  useEffect(() => {
    if (searchQuery) {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleUserUpdated = async (updatedUser) => {
    try {
      // Update the user in the current state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
      await fetchUsers();

      // Close the modal
      handleClose();

      setSelectedUsers([]);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleClose = () => setShowModal(false);

  // block, unblock, or delete action in bulk
  const handleBulkAction = async (action) => {
    let newStatus;

    // action type
    if (action === "block") {
      newStatus = "blocked";
    } else if (action === "unblock") {
      newStatus = "active";
    }

    try {
      // status change for each selected user
      if (action === "block" || action === "unblock") {
        for (const userId of selectedUsers) {
          await api.patch(`/users/${userId}/status`, { status: newStatus });
        }

        // Update local users state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, status: newStatus }
              : user
          )
        );
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.map((user) =>
            selectedUsers.includes(user.id)
              ? { ...user, status: newStatus }
              : user
          )
        );
      } else if (action === "delete") {
        // Delete users
        for (const userId of selectedUsers) {
          await api.delete(`/users/${userId}`);
        }

        // Remove deleted users from the local state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => !selectedUsers.includes(user.id))
        );
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => !selectedUsers.includes(user.id))
        );
      }

      setSelectedUsers([]);

      if (selectedUsers.includes(currentUser.id)) {
        setTimeout(() => {
          handleLogout();
        }, 1000);
      }
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    }
  };

  const handleEdit = () => {
    const userToEdit = users.find((user) => selectedUsers.includes(user.id));
    setSelectedUser(userToEdit);
    setShowModal(true);
  };

  const isActionDisabled = selectedUsers.length === 0;

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <>
      <Navbar
        expand="lg"
        className="mb-3 d-flex justify-content-center border-bottom border-light-subtle "
      >
        <Container className="d-flex w-100 align-items-center justify-content-between">
          <Navbar.Brand href="#" className="fw-bold fs-4">
            User Management Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            className="justify-content-between"
          >
            <Form className="d-flex ms-auto">
              <FormControl
                type="search"
                placeholder="Enter name or email"
                className="me-2 h-25 align-self-center"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Navbar.Text className="d-flex fs-5 fw-bold h-25 ms-5 align-items-center">
                Hello,
                <span className="text-success ms-1">{userName || "User"}</span>
              </Navbar.Text>
              <Button
                variant="outline-danger"
                className="ms-3 h-auto  align-self-center"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <div className="d-flex justify-content-start gap-4 mb-3 mt-5">
          <Button
            variant="danger"
            className="fs-5 d-flex gap-2"
            title="Click to Block"
            onClick={() => handleBulkAction("block")}
            disabled={isActionDisabled}
          >
            Block <TbLock className="align-self-center" />
          </Button>
          <Button
            variant="secondary"
            title="Click to Unblock"
            onClick={() => handleBulkAction("unblock")}
            disabled={isActionDisabled}
          >
            <TbLockOpen2 className="fs-4" />
          </Button>
          <Button
            variant="primary"
            title="Click to Edit"
            className="fs-5 d-flex gap-2"
            onClick={handleEdit}
            disabled={selectedUsers.length !== 1}
          >
            Edit <FaUserEdit className="align-self-center" />
          </Button>
          <Button
            variant="danger"
            title="Click to Delete"
            onClick={() => handleBulkAction("delete")}
            disabled={isActionDisabled}
          >
            <RiDeleteBin2Line className="fs-4" />
          </Button>
        </div>

        {filteredUsers.length === 0 ? (
          <Alert variant="info">No users found.</Alert>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedUsers.length === filteredUsers.length}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Last Login</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="d-flex gap-2">
                    {user.name}
                    {currentUser.name === user.name ? (
                      <FaUser className=" align-self-center text-success" />
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {user.last_login
                      ? new Date(user.last_login).toLocaleString()
                      : "Never"}
                  </td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {selectedUser && (
          <EditUserModal
            show={showModal}
            handleClose={handleClose}
            user={selectedUser}
            onUserUpdated={handleUserUpdated}
          />
        )}
      </Container>
    </>
  );
};

export default Dashboard;
