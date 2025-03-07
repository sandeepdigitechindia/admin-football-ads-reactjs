import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/admin/dashboard");
      } 
    }
  }, [token, role, navigate]);
  return (
    <div className="home">
      {/* Ads Section */}
      <LoginForm />
    </div>
  );
};
export default Login;
