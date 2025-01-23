import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
      alert("Forget Password successful!");
      setFormData({ email: "" });
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-16">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image and Text */}
        <div className="w-full lg:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg mb-6">
            Forget Password in to your account to access exclusive content and
            manage your settings.
          </p>
          <img
            src="/about/login.jpg" // Replace with your image path
            alt="Login Illustration"
            className="mt-4 rounded-lg w-full object-cover"
          />
        </div>

        {/* Right Side - Forget Password Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl text-blue-600 font-bold text-center mb-6">
            Forget Password
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Accept Terms Checkbox */}
            <div className="mb-6">
              <Link to="/login" className="text-blue-600">
                Back to Login
              </Link>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
