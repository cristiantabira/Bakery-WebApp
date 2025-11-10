import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../services/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/UserManagementPage.css";

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
            return;
        }
        fetchUsers();
    }, [isAdmin, navigate]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/auth/users", {
                withCredentials: true,
            });
            setUsers(response.data.users);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError("Failed to load users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(
                `/auth/users/${userId}/role`,
                { role: newRole },
                { withCredentials: true }
            );
            // Update the user in the local state
            setUsers(
                users.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
            alert("User role updated successfully!");
        } catch (err) {
            console.error("Failed to update user role:", err);
            alert("Failed to update user role. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <p>Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">User Management</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            user.role === "admin"
                                                ? "bg-danger"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={user.role}
                                        onChange={(e) =>
                                            handleRoleChange(user.id, e.target.value)
                                        }
                                        style={{ width: "auto", display: "inline-block" }}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagementPage;

