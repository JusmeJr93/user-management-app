import { useState } from "react";
import { deleteUser, updateUserStatus } from "../services/userService";


const useBulkActions = (users, setUsers, setFilteredUsers, currentUser, handleLogout) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleBulkAction = async (action) => {
        let newStatus;

        if (action === "block") {
            newStatus = "blocked";
        } else if (action === "unblock") {
            newStatus = "active";
        }

        try {
            if (action === "block" || action === "unblock") {
                for (const userId of selectedUsers) {
                    await updateUserStatus(userId, newStatus);
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
                for (const userId of selectedUsers) {
                    await deleteUser(userId);
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

    return { selectedUsers, setSelectedUsers, handleBulkAction };
};

export default useBulkActions;