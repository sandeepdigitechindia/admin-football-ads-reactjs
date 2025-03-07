import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("admin");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("admin", JSON.stringify(userData));
    localStorage.setItem("role", userData.role);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    toast.success("You have been logged out.", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
