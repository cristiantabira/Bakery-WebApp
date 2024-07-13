import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AccountPage.css";

const AccountPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(null);
    const [passwordSuccess, setPasswordSuccess] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/account/profile",
                    {
                        httpOnly: true,
                        secure: false,
                        credentials: true,
                        withCredentials: true,
                        sameSite: "Lax",
                    }
                );
                console.log("User data:", response.data);
                setUserData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

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
                {
                    currentPassword,
                    newPassword,
                },
                { withCredentials: true }
            );
            setPasswordSuccess(response.data.message);
        } catch (error) {
            setPasswordError(
                error.response?.data?.error || "Failed to change password"
            );
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="account-container">
            <h2 className="account-title">My Account</h2>
            {userData ? (
                <div className="account-details">
                    <div className="account-item">
                        <label>Name:</label>
                        <span>{userData.name}</span>
                    </div>
                    <div className="account-item">
                        <label>Email:</label>
                        <span>{userData.email}</span>
                    </div>
                </div>
            ) : (
                <p>No user data available</p>
            )}
            <div className="account-actions">
                <button
                    onClick={() =>
                        (document.getElementById(
                            "change-password-form"
                        ).style.display = "block")
                    }
                    className="account-button"
                >
                    Change Password
                </button>
                <button className="account-button">View Orders</button>
                <button className="account-button">Change Details</button>
            </div>

            <div
                id="change-password-form"
                className="change-password-form"
                style={{ display: "none" }}
            >
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                    <div className="form-group">
                        <label>Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                        {passwordError && (
                            <p className="error-message">{passwordError}</p>
                        )}
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
                    {passwordSuccess && (
                        <p className="success-message">{passwordSuccess}</p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AccountPage;
