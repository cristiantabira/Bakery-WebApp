import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const token = Cookies.get("access-token");
        if (token) {
            try {
                const response = await axios.get("/auth/validateToken", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                if (response.data.valid) {
                    setUser(response.data.user);
                    setRole(response.data.user.role);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Failed to verify token", error);
                setIsAuthenticated(false);
            }
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await axios.post("/auth/login", credentials, {
                withCredentials: true,
            });
            setUser(data.user);
            setRole(data.user.role);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/auth/logout", {}, { withCredentials: true });
            Cookies.remove("access-token");
            setUser(null);
            setRole(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, role, isAuthenticated, login, logout }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
