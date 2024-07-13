import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
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
        };
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await axios.post("/auth/login", credentials, {
                withCredentials: true,
            });
            setUser(data.user);
            setIsAuthenticated(true);
            Cookies.set("access-token", data.token, { expires: 30 });
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

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
