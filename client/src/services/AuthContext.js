import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get("access-token");
            if (token) {
                try {
                    const { data } = await axios.get("/auth/profile", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser(data.user);
                } catch (error) {
                    console.error("Failed to fetch user", error);
                }
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (credentials) => {
        try {
            const { data } = await axios.post("/auth/login", credentials, {
                withCredentials: true,
            });
            setUser(data.user);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/auth/logout", {}, { withCredentials: true });
            Cookies.remove("access-token");
            setUser(null);
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
