import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Ensure you have this CSS file for styling
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\SignUpPage.css";

const SignUp = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Here you would typically handle the form submission to your backend
        console.log(form);
        // navigate('/somepath'); // Optionally, navigate to another route after successful signup
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2 className="text-center">Sign Up</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
