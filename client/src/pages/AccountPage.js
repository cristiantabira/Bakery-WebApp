import React from "react";
import "../styles/AccountPage.css";

const AccountPage = () => {
    const user = {
        name: "Cristian Țabîră",
        email: "cristian.tabira@yahoo.com",
    };

    const handleChangePassword = () => {
        alert("Change Password Clicked");
    };

    const handleViewOrders = () => {
        alert("View Orders Clicked");
    };

    const handleChangeDetails = () => {
        alert("Change Details Clicked");
    };

    return (
        <div className="account-container">
            <h2 className="account-title">My Account</h2>
            <div className="account-details">
                <div className="account-item">
                    <label>Name:</label>
                    <span>{user.name}</span>
                </div>
                <div className="account-item">
                    <label>Email:</label>
                    <span>{user.email}</span>
                </div>
            </div>
            <div className="account-actions">
                <button
                    onClick={handleChangePassword}
                    className="account-button"
                >
                    Change Password
                </button>
                <button onClick={handleViewOrders} className="account-button">
                    View Orders
                </button>
                <button
                    onClick={handleChangeDetails}
                    className="account-button"
                >
                    Change Details
                </button>
            </div>
        </div>
    );
};

export default AccountPage;
