import { useState } from "react";
import { Alert, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ProfileModal from "../components/ProfileModal";
import Header from "../components/Header";
import SearchUser from "../components/SearchUser";
import AdminActions from "../components/AdminActions";
import UserTable from "../components/UserTable";
import useFetchUsers from "../hooks/useFetchUsers";
import useCurrentUser from "../hooks/useCurrentUser";
import useUserSearch from "../hooks/useUserSearch";
import useBulkActions from "../hooks/useBulkActions";
import { updateUser } from "../services/userService";

const Dashboard = () => {
  const { users, setUsers, loading, fetchUsers } = useFetchUsers();
  const { currentUser, userName, isAdmin, userPhoto } = useCurrentUser(users);
  const { searchQuery, setSearchQuery, filteredUsers, setFilteredUsers } =
    useUserSearch(users);
  const { selectedUsers, setSelectedUsers, handleBulkAction } = useBulkActions(
    users,
    setUsers,
    setFilteredUsers,
    currentUser,
    handleLogout
  );

  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();

  //for hoisting
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  }

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

  const handleUserUpdated = async (updatedUser) => {
    try {
      await updateUser(updatedUser.id, updatedUser);
      fetchUsers();
      setShowProfileModal(false);
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleAdminEditUser = () => {
    const userToEdit = users.find((user) => selectedUsers.includes(user.id));
    setSelectedUser(userToEdit);
    setShowProfileModal(true);
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
      <Header
        userData={{
          userName,
          userPhoto,
          setShowProfileModal,
          logout: handleLogout,
        }}
      />
      <Container className="overflow-y-auto">
        <div className="d-flex flex-column flex-lg-row justify-content-lg-between gap-4 mb-4 mt-5">
          <SearchUser
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {isAdmin && (
            <AdminActions
              adminActions={{
                handleAdminEditUser,
                selectedUsers,
                handleBulkAction,
                isActionDisabled,
              }}
            />
          )}
        </div>

        {filteredUsers.length === 0 ? (
          <Alert variant="info">No users found.</Alert>
        ) : (
          <UserTable
            tableProps={{
              isAdmin,
              currentUser,
              selectedUsers,
              filteredUsers,
              handleSelectAll,
              handleSelectUser,
            }}
          />
        )}
      </Container>

      {showProfileModal && (
        <ProfileModal
          user={selectedUser || currentUser}
          show={showProfileModal}
          onHide={() => {
            selectedUser ? setSelectedUsers([]) : "";
            setSelectedUser(null);
            setShowProfileModal(false);
          }}
          onSave={handleUserUpdated}
          isAdmin={isAdmin}
        />
      )}

      <Footer />
    </>
  );
};

export default Dashboard;
