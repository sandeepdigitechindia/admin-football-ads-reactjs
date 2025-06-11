import React, { useState,useContext } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CountryContext } from "../../../context/CountryContext";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const roles = ["coach", "agent", "club"];
const ClubForm = () => {
  const [formData, setFormData] = useState({
    club_name: "",
    club_desc: "",
    club_logo: null,
    club_idcard: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { countries } = useContext(CountryContext);

  const validate = () => {
    const newErrors = {};

    if (!formData.club_name.trim()) {
      newErrors.club_name = "Club Name is required.";
    }

    if (!formData.club_desc.trim()) {
      newErrors.club_desc = "Club Desc is required.";
    }

    // first Name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First Name is required.";
    } else if (formData.first_name.length < 3) {
      newErrors.first_name = "First Name must be at least 3 characters.";
    }

    // Last Name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last Name is required.";
    } else if (formData.last_name.length < 3) {
      newErrors.last_name = "Last Name must be at least 3 characters.";
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
    } else if (!/^\+?\d{1,3}[-\s]?\d{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Phone number must include country code and be 10 digits (e.g., +33 9876543210).";
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      // Creating FormData to send files
      const data = new FormData();
      data.append("club_name", formData.club_name);
      data.append("club_desc", formData.club_desc);
      data.append("club_logo", formData.club_logo);
      data.append("club_idcard", formData.club_idcard);
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("country", formData.country);
      data.append("role", formData.role);
      data.append("password", formData.password);

      await API.post(`${BASE_URL}/api/admin/users`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/clubs");
      toast.success("Club Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({
        club_name: "",
        club_desc: "",
        club_logo: null,
        club_idcard: null,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        country: "",
        role: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Club creation failed. Try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Clubs</h1>
            <Link
              to={"/admin/clubs"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create Club
            </h1>

            <form onSubmit={handleSubmit} noValidate>
              {/* Club Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="club_name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Club Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="club_name"
                  name="club_name"
                  value={formData.club_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring focus:ring-blue-300`}
                  placeholder="Enter your Club Name"
                />
                {errors.club_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.club_name}
                  </p>
                )}
              </div>

              {/* Club Logo */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Club Logo <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="club_logo"
                  onChange={handleFileChange}
                  className={`w-full p-3 border ${
                    errors.club_logo ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.club_logo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.club_logo}
                  </p>
                )}
              </div>

              {/* Club Id Card */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Club ID Card <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  // accept="image/*"
                  name="club_idcard"
                  onChange={handleFileChange}
                  className={`w-full p-3 border ${
                    errors.club_idcard ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.club_idcard && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.club_idcard}
                  </p>
                )}
              </div>

              {/* Name Fields (First Name and Last Name) */}
              <div className="flex space-x-4 mb-4">
                {/* First Name Field */}
                <div className="w-1/2">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.first_name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter your first name"
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.first_name}
                    </p>
                  )}
                </div>

                {/* Last Name Field */}
                <div className="w-1/2">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.last_name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter your last name"
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.last_name}
                    </p>
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
                  placeholder="+33 9876543210"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Club Desc Field */}
              <div className="mb-4">
                <label
                  htmlFor="club_desc"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Club Desc <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="club_desc"
                  id="club_desc"
                  value={formData.club_desc}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.club_desc ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="3"
                  placeholder="Enter your Club Desc"
                ></textarea>

                {errors.club_desc && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.club_desc}
                  </p>
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
                <div className="flex relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring focus:ring-blue-300`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 absolute right-4 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                  ></i>
                </button>
                </div>
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
                <div className="flex relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:ring focus:ring-blue-300`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 absolute right-4 top-2"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                  ></i>
                </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Register..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
export default ClubForm;
