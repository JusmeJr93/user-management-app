/* eslint-disable react/prop-types */
import { Table } from "react-bootstrap";
import UserRow from "./UserRow";

const UserTable = ({
  tableProps: {
    isAdmin,
    currentUser,
    selectedUsers,
    filteredUsers,
    handleSelectAll,
    handleSelectUser,
  },
}) => {
  return (
    <Table striped bordered hover responsive className="table-hover">
      <thead>
        <tr>
          {isAdmin && (
            <th>
              <input
                type="checkbox"
                title={
                  selectedUsers.length === filteredUsers.length
                    ? "Unselect All"
                    : "Select All"
                }
                checked={selectedUsers.length === filteredUsers.length}
                onChange={handleSelectAll}
              />
            </th>
          )}
          <th>Name</th>
          <th>Email</th>
          <th>Last Login</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {filteredUsers.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            isAdmin={isAdmin}
            currentUser={currentUser}
            selectedUsers={selectedUsers}
            handleSelectUser={handleSelectUser}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
