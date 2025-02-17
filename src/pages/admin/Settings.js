import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
// Sample countries and roles
const countries = [
  "United States",
  "India",
  "Canada",
  "Australia",
  "United Kingdom",
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
    profilePicture: null,
    site_name: "",
    site_logo: null,
    home_page_video: null,
    home_page_title: "",
    home_page_subtitle: "",
    official_mail: "",
    official_number: "",
    official_address: "",
    facebook_link: "",
    twitter_link: "",
    instagram_link: "",
    linkedin_link: "",
    home_page_banner: null,
    about_page_banner: null,
    contact_page_banner: null,
    about_page_content: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const response = await API.get("/api/admin/profile");
        // Ensure the response is an array

        const adminFromAPI = {
          id: response.data.user.id,
          role: response.data.user.role,
        };

        setAdmin(adminFromAPI);
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };

    fetchAdminId();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await API.get(
          "/api/admin/settings/67a34a95a6870c076223ca18"
        );
        // Ensure the response is an array

        const getData = response.data;

        setFormData({
          site_name: getData.site_name || "",
          home_page_title: getData.home_page_title || "",
          home_page_subtitle: getData.home_page_subtitle || "",
          about_page_content: getData.about_page_content || "",

          official_mail: getData.official_mail || "",
          official_number: getData.official_number || "",
          official_address: getData.official_address || "",

          facebook_link: getData.facebook_link || "",
          twitter_link: getData.twitter_link || "",
          instagram_link: getData.instagram_link || "",
          linkedin_link: getData.linkedin_link || "",

          site_logo: getData.site_logo ? BASE_URL + getData.site_logo : null,
          home_page_video: getData.home_page_video
            ? BASE_URL + getData.home_page_video
            : null,
          home_page_banner: getData.home_page_banner
            ? BASE_URL + getData.home_page_banner
            : null,
          about_page_banner: getData.about_page_banner
            ? BASE_URL + getData.about_page_banner
            : null,
          contact_page_banner: getData.contact_page_banner
            ? BASE_URL + getData.contact_page_banner
            : null,
        });
      } catch (error) {
        console.error("Error fetching admin:", error);
      }
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (!admin?.id) return;

      try {
        const response = await API.get(`/api/admin/admins/${admin.id}`);
        const getData = response.data;

        setFormData({
          first_name: getData.first_name || "",
          last_name: getData.last_name || "",
          email: getData.email || "",
          phone: getData.phone || "",
          country: getData.country || "",
          password: getData.password || "",
          profilePicture: getData.profile ? BASE_URL + getData.profile : null,
        });
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };

    fetchAdminProfile();
  }, [admin]);

  const handleTabChange = (tab) => setActiveTab(tab);
  const [preview, setPreview] = useState(null);

  const validate = () => {
    const newErrors = {};

    // Validation similar to the registration form, adjust based on whether it's password change or profile update
    if (activeTab === "profile") {
      if (!formData.first_name.trim()) {
        newErrors.first_name = "First Name is required.";
      }
      if (!formData.last_name.trim()) {
        newErrors.last_name = "Last Name is required.";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      }
      if (!formData.country) {
        newErrors.country = "Please select a country.";
      }
    }

    if (activeTab === "password") {
      // Password change validation
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required.";
      }
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

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    if (activeTab === "setting") {
      // Setting validation
      if (!formData.site_name.trim()) {
        newErrors.site_name = "Site Name is required.";
      }

      if (!formData.site_logo) newErrors.site_logo = "Site Logo is required.";
      if (!formData.home_page_video)
        newErrors.home_page_video = "Home page video is required.";
      if (!formData.about_page_banner)
        newErrors.about_page_banner = "About page banner is required.";
      if (!formData.home_page_banner)
        newErrors.home_page_banner = "Home page banner is required.";
      if (!formData.about_page_content)
        newErrors.about_page_content = "About page content is required.";
      if (!formData.contact_page_banner)
        newErrors.contact_page_banner = "Contact page banner is required.";
      if (!formData.home_page_title.trim())
        newErrors.home_page_title = "Home page title is required.";
      if (!formData.home_page_subtitle.trim())
        newErrors.home_page_subtitle = "Home page subtitle is required.";
      if (!formData.official_mail.trim())
        newErrors.official_mail = "Official mail is required.";
      if (!formData.official_number.trim())
        newErrors.official_number = "Official number is required.";
      if (!formData.official_address.trim())
        newErrors.official_address = "Official address is required.";
      if (!formData.facebook_link.trim())
        newErrors.facebook_link = "Facebook link is required.";
      if (!formData.twitter_link.trim())
        newErrors.twitter_link = "Twitter link is required.";
      if (!formData.instagram_link.trim())
        newErrors.instagram_link = "Instagram link is required.";
      if (!formData.linkedin_link.trim())
        newErrors.linkedin_link = "Linedin link is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      if (activeTab === "profile") {
        // Append text fields
        formDataToSend.append("first_name", formData.first_name);
        formDataToSend.append("last_name", formData.last_name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("country", formData.country);

        // Append file only if it's selected
        if (formData.profilePicture instanceof File) {
          formDataToSend.append("profile", formData.profilePicture);
        }

        await API.put(
          `${BASE_URL}/api/admin/admins/${admin.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Admin Updated Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      if (activeTab === "password") {
        // Only include password if it's not empty
        if (formData.password.trim() !== "") {
          formDataToSend.password = formData.password;
        }

        await API.put(
          `${BASE_URL}/api/admin/admins/${admin.id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Password Changed Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      if (activeTab === "setting") {
        // Append text fields
        formDataToSend.append("site_name", formData.site_name);
        formDataToSend.append("home_page_title", formData.home_page_title);
        formDataToSend.append(
          "home_page_subtitle",
          formData.home_page_subtitle
        );
        formDataToSend.append(
          "about_page_content",
          formData.about_page_content
        );
        formDataToSend.append("official_mail", formData.official_mail);
        formDataToSend.append("official_number", formData.official_number);
        formDataToSend.append("official_address", formData.official_address);
        formDataToSend.append("facebook_link", formData.facebook_link);
        formDataToSend.append("instagram_link", formData.instagram_link);
        formDataToSend.append("twitter_link", formData.twitter_link);
        formDataToSend.append("linkedin_link", formData.linkedin_link);

        // Append file only if it's selected
        if (formData.site_logo instanceof File) {
          formDataToSend.append("site_logo", formData.site_logo);
        }

        if (formData.home_page_video instanceof File) {
          formDataToSend.append("home_page_video", formData.home_page_video);
        }

        if (formData.home_page_banner instanceof File) {
          formDataToSend.append(
            "home_page_banner",
            formData.home_page_banner
          );
        }

        if (formData.about_page_banner instanceof File) {
          formDataToSend.append(
            "about_page_banner",
            formData.about_page_banner
          );
        }

        if (formData.contact_page_banner instanceof File) {
          formDataToSend.append(
            "contact_page_banner",
            formData.contact_page_banner
          );
        }

        await API.put(
          `${BASE_URL}/api/admin/settings/67a34a95a6870c076223ca18`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Settings Updated Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed. Try again.",
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
          {/* Admin Profile Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
          </header>

          {/* Tab Navigation */}
          <div className="mt-4">
            <div className="flex border-b border-gray-300">
              <button
                className={`py-2 px-4 ${
                  activeTab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("profile")}
              >
                Profile
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "password"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("password")}
              >
                Change Password
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "setting"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("setting")}
              >
                General Settings
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-4 max-w-3xl mx-auto w-full">
            {activeTab === "profile" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Profile Picture */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <label htmlFor="profilePicture" className="cursor-pointer">
                      <img
                        src={
                          preview ||
                          formData.profilePicture ||
                          "/common/man.png"
                        }
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border shadow"
                      />
                      <span className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow">
                        <i className="fas fa-camera"></i>
                      </span>
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Click to upload a profile picture
                  </p>
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Save Changes..." : "Save Changes"}
                </button>
              </form>
            )}

            {activeTab === "password" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Current Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter your current password"
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter new password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
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
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Confirm new password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Change Password..." : "Change Password"}
                </button>
              </form>
            )}

            {activeTab === "setting" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Setting  */}

                <div className="mb-4">
                  <label
                    htmlFor="site_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Site Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="site_name"
                    name="site_name"
                    value={formData.site_name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.site_name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter your site name"
                  />
                  {errors.site_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.site_name}
                    </p>
                  )}
                </div>

                {/* site_logo */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Site Logo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="site_logo"
                    onChange={handleFileChange}
                    className={`w-full p-3 border ${
                      errors.site_logo ? "border-red-500" : "border-gray-300"
                    } rounded-lg`}
                  />
                  {errors.site_logo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.site_logo}
                    </p>
                  )}

                  <img
                    src={formData.site_logo}
                    alt={`${formData.site_name}`}
                    className="w-48 h-24 rounded-full mx-auto my-4"
                  />
                </div>

                {/* Home Page Video */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Home Page Video <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className={`w-full p-3 border ${
                      errors.home_page_video
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg`}
                  />

                  <video
                    width="600"
                    controls
                    className="rounded mx-auto my-4"
                  >
                    <source src={formData.home_page_video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {errors.home_page_video && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.home_page_video}
                    </p>
                  )}
                </div>

                {/* Home Page Title */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Home Page Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="home_page_title"
                    value={formData.home_page_title}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.home_page_title
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter home page title"
                  />
                  {errors.home_page_title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.home_page_title}
                    </p>
                  )}
                </div>

                {/* Home Page Sub Title */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Home Page Sub Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="home_page_subtitle"
                    value={formData.home_page_subtitle}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.home_page_subtitle
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter home page subtitle"
                  />
                  {errors.home_page_subtitle && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.home_page_subtitle}
                    </p>
                  )}
                </div>

                {/* Official Email */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Official Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="official_mail"
                    value={formData.official_mail}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.official_mail
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter official mail"
                  />
                  {errors.official_mail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.official_mail}
                    </p>
                  )}
                </div>

                {/* Official Phone Number */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Official Phone Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="official_number"
                    value={formData.official_number}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.official_number
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter official number"
                  />
                  {errors.official_number && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.official_number}
                    </p>
                  )}
                </div>

                {/* Official Address */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Official Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="official_address"
                    value={formData.official_address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.official_address
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter official address"
                  ></textarea>
                  {errors.official_address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.official_address}
                    </p>
                  )}
                </div>
                {/* Social Media Links */}

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Facebook Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="facebook_link"
                    value={formData.facebook_link}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.facebook_link
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter facebook link"
                  />
                  {errors.facebook_link && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.facebook_link}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Twitter Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="twitter_link"
                    value={formData.twitter_link}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.twitter_link ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter twitter link"
                  />
                  {errors.twitter_link && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.twitter_link}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Instagram Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="instagram_link"
                    value={formData.instagram_link}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.instagram_link
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter instagram link"
                  />
                  {errors.instagram_link && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.instagram_link}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Linedin Link <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="linkedin_link"
                    value={formData.linkedin_link}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.linkedin_link
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter linkedin link"
                  />
                  {errors.linkedin_link && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.linkedin_link}
                    </p>
                  )}
                </div>

                {/* home_page_banner */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Home Page Banner <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="home_page_banner"
                    onChange={handleFileChange}
                    className={`w-full p-3 border ${
                      errors.home_page_banner
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg`}
                  />
                  {errors.home_page_banner && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.home_page_banner}
                    </p>
                  )}

                  <img
                    src={formData.home_page_banner}
                    alt={`${formData.site_name}`}
                    className="w-48 h-24 rounded-full mx-auto my-4"
                  />
                </div>

                {/* about_page_banner */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    About Page Banner <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="about_page_banner"
                    onChange={handleFileChange}
                    className={`w-full p-3 border ${
                      errors.about_page_banner
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg`}
                  />
                  {errors.about_page_banner && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.about_page_banner}
                    </p>
                  )}

                  <img
                    src={formData.about_page_banner}
                    alt={`${formData.site_name}`}
                    className="w-48 h-24 rounded-full mx-auto my-4"
                  />
                </div>

                {/* About Page Content */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    About Page Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="about_page_content"
                    value={formData.about_page_content}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.about_page_content
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter official address"
                  ></textarea>
                  {errors.about_page_content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.about_page_content}
                    </p>
                  )}
                </div>

                {/* contact_page_banner */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Contact Page Banner <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="contact_page_banner"
                    onChange={handleFileChange}
                    className={`w-full p-3 border ${
                      errors.contact_page_banner
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg`}
                  />
                  {errors.contact_page_banner && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contact_page_banner}
                    </p>
                  )}

                  <img
                    src={formData.contact_page_banner}
                    alt={`${formData.site_name}`}
                    className="w-48 h-24 rounded-full mx-auto my-4"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Update..." : "Update"}
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
