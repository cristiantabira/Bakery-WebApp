import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "C:\\Github Projects\\TW Proiect\\Bakery-WebApp\\client\\src\\styles\\LoginPage.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Login submitted", { email, password });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="text-center">Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    Log In
                </button>
                <div className="mt-5">
                    Don't have an account yet?
                    <br /> <Link to="/signup">Sign up</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
