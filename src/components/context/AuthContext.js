import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (username, password) => {
        try {
            const res = await axios.post("https://linktree-mg98.onrender.com/api/auth/login", { username, password });
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
            throw new Error(err.response?.data?.message || "Login failed");
        }
    };

    const register = async (username, password) => {
        try {
            const res = await axios.post("https://linktree-mg98.onrender.com/api/auth/register", { username, password });
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
        } catch (err) {
            throw new Error(err.response?.data?.message || "Registration failed");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Mark loading as complete
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or message
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);