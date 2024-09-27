import { FaUser } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const UserRow = ({
  user,
  isAdmin,
  currentUser,
  selectedUsers,
  handleSelectUser,
}) => {
  return (
    <tr>
      {isAdmin && (
        <td>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.id)}
            onChange={() => handleSelectUser(user.id)}
          />
        </td>
      )}
      <td className="d-flex gap-2">
        {user.name}
        {currentUser?.email === user.email && (
          <FaUser className=" align-self-center text-success" />
        )}
      </td>
      <td>{user.email}</td>
      <td>
        {user.last_login ? new Date(user.last_login).toLocaleString() : "N/A"}
      </td>
      <td className={user.status === "active" ? "text-success" : "text-danger"}>
        {user.status}
      </td>
    </tr>
  );
};

export default UserRow;
