import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Cookie is httpOnly, so we can't read it with JavaScript
                // But withCredentials: true will automatically send it
                const response = await axios.get("/auth/validateToken", {
                    withCredentials: true,
                });
                if (response.data.valid) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                // If token is invalid or missing, user is not authenticated
                console.error("Failed to verify token", error);
                setIsAuthenticated(false);
            }
        };
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await axios.post("/auth/login", credentials, {
                withCredentials: true,
            });
            // Cookie is set by server with httpOnly, so we don't need to set it here
            // Validate the token to get user info
            const response = await axios.get("/auth/validateToken", {
                withCredentials: true,
            });
            if (response.data.valid) {
                setUser(response.data.user);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/auth/logout", {}, { withCredentials: true });
            Cookies.remove("access-token");
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Helper function to check if user is admin
    const isAdmin = user && user.role === "admin";

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
