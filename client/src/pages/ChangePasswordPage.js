import React, { useState } from "react";
import axios from "axios";
import "../styles/ChangePasswordPage.css";

const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [passwordSuccess, setPasswordSuccess] = useState(null);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError(null);
        setPasswordSuccess(null);

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:5000/account/changePassword",
                { currentPassword, newPassword },
                { withCredentials: true }
            );
            setPasswordSuccess(response.data.message);
        } catch (error) {
            setPasswordError(
                error.response?.data?.error || "Failed to change password"
            );
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                    <label>Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="account-button">
                    Change Password
                </button>
                {passwordError && (
                    <p className="error-message">{passwordError}</p>
                )}
                {passwordSuccess && (
                    <p className="success-message">{passwordSuccess}</p>
                )}
            </form>
        </div>
    );
};

export default ChangePasswordPage;
