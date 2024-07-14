import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AccountPage.css";

const AccountPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
                    onClick={() => navigate("/change-password")}
                    className="account-button"
                >
                    Change Password
                </button>
                <button
                    onClick={() => navigate("/orders")}
                    className="account-button"
                >
                    View Orders
                </button>
            </div>
        </div>
    );
};

export default AccountPage;
