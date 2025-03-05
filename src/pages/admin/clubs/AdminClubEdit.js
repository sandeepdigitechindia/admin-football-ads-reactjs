import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const countries = [
  "United States",
  "India",
  "Canada",
  "Australia",
  "United Kingdom",
];
const roles = ["player", "coach", "agent", "club"];
const AdminClubEdit = () => {
  const [formData, setFormData] = useState({
    club_name: "",
    club_logo: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    role: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch club data from API
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await API.get(`/api/admin/users/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching club data:", error);
      }
    };

    if (id) fetchClub();
  }, [id]);

  const validate = () => {
    const newErrors = {};

    if (!formData.club_name.trim()) {
      newErrors.club_name = "Club Name is required.";
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
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, club_logo: e.target.files[0] });
    }
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
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append("club_name", formData.club_name);
      formDataToSend.append("first_name", formData.first_name);
      formDataToSend.append("last_name", formData.last_name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("role", formData.role);

      // Only include password if it's not empty
      if (formData.password.trim() !== "") {
        formDataToSend.append("password", formData.password);
      }

      // Append file only if it's selected
      if (formData.club_logo instanceof File) {
        formDataToSend.append("club_logo", formData.club_logo);
      }

      await API.put(`${BASE_URL}/api/admin/users/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/clubs");
      toast.success("Club Updated Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Club Update failed. Try again.",
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
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Club</h1>

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
                  onChange={handleFileChange}
                  className={`w-full p-3 border ${
                    errors.club_logo ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                <img
                  src={BASE_URL + formData.club_logo}
                  alt={`${formData.club_name}`}
                  className="w-48 h-24 rounded-full mx-auto my-4"
                />
                {errors.club_logo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.club_logo}
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
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
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
export default AdminClubEdit;
