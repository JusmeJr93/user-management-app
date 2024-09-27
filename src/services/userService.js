import api from "./api";

export const fetchingUsers = async () => {
    return api.get("/users");
};

export const updateUser = async (userId, updatedUser) => {
    return api.put(`/users/${userId}`, updatedUser);
};

export const updateUserStatus = async (userId, status) => {
    return api.patch(`/users/${userId}/status`, { status });
};

export const deleteUser = async (userId) => {
    return api.delete(`/users/${userId}`);
};