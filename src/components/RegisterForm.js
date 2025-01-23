import React, { useState } from "react";
import { Link } from "react-router-dom";

const countries = [
  "United States",
  "India",
  "Canada",
  "Australia",
  "United Kingdom",
];
const roles = ["Player", "Coach", "Agent", "Club"];

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    role: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // first Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
    } else if (formData.firstName.length < 3) {
      newErrors.firstName = "First Name must be at least 3 characters.";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
    } else if (formData.lastName.length < 3) {
      newErrors.lastName = "Last Name must be at least 3 characters.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // DOB validation
    if (!formData.dob.trim()) {
      newErrors.dob = "DOB number is required.";
    } 

    // Country validation
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // acceptTerms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Please accept the terms and conditions.";
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
      alert("Registration successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        country: "",
        role: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
      setErrors({});
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-16">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image and Text */}
        <div className="w-full lg:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today!</h2>
          <p className="text-lg mb-6">
            Create your account to access exclusive features, manage your
            profile, and more!
          </p>
          <img
            src="/about/register.jpg" // Replace with your image path
            alt="Register Illustration"
            className="mt-4 rounded-lg w-full object-cover"
          />
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Name Fields (First Name and Last Name) */}
            <div className="flex space-x-4 mb-4">
              {/* First Name Field */}
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring focus:ring-blue-300`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last Name Field */}
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring focus:ring-blue-300`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

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

            {/* Phone Field */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* dob Field */}
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                DOB <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.dob ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
                placeholder="Enter your dob number"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>

            {/* Country Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
              >
                <option value="">Select your country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.role ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
              >
                <option value="">Select your role</option>
                {roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Accept Terms Checkbox */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  I accept the terms and conditions
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center mt-2">
            Have an account?
            <br />
            <Link to="/login" className="text-blue-600">
              Login now!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
