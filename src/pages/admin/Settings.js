import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("setting");
  const [formData, setFormData] = useState({
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
    terms_and_conditions: "",
    privacy_policy: "",

    wcu_count1: "",
    wcu_title1: "",
    wcu_count2: "",
    wcu_title2: "",
    wcu_count3: "",
    wcu_title3: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

          terms_and_conditions: getData.terms_and_conditions || "",
          privacy_policy: getData.privacy_policy || "",

          wcu_count1: getData.wcu_count1 || "",
          wcu_title1: getData.wcu_title1 || "",
          wcu_count2: getData.wcu_count2 || "",
          wcu_title2: getData.wcu_title2 || "",
          wcu_count3: getData.wcu_count3 || "",
          wcu_title3: getData.wcu_title3 || "",

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

  const handleTabChange = (tab) => setActiveTab(tab);

  const validate = () => {
    const newErrors = {};

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

    if (activeTab === "policy") {
      // policy validation

      if (!formData.terms_and_conditions.trim())
        newErrors.terms_and_conditions = "Terms and Conditions is required.";
      if (!formData.privacy_policy.trim())
        newErrors.privacy_policy = "Privacy Policy is required.";
    }

    if (activeTab === "why_choose_us") {
      // policy validation

      if (!formData.wcu_count1.trim())
        newErrors.wcu_count1 = "Why Choose Us count1 is required.";
      if (!formData.wcu_title1.trim())
        newErrors.wcu_title1 = "Why Choose Us title1 is required.";

      if (!formData.wcu_count2.trim())
        newErrors.wcu_count2 = "Why Choose Us count2 is required.";
      if (!formData.wcu_title2.trim())
        newErrors.wcu_title2 = "Why Choose Us title2 is required.";

      if (!formData.wcu_count3.trim())
        newErrors.wcu_count3 = "Why Choose Us count3 is required.";
      if (!formData.wcu_title3.trim())
        newErrors.wcu_title3 = "Why Choose Us title3 is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          formDataToSend.append("home_page_banner", formData.home_page_banner);
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
      if (activeTab === "policy") {
        formDataToSend.append(
          "terms_and_conditions",
          formData.terms_and_conditions
        );
        formDataToSend.append("privacy_policy", formData.privacy_policy);

        await API.put(
          `${BASE_URL}/api/admin/settings/67a34a95a6870c076223ca18`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Policy Changed Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      if (activeTab === "why_choose_us") {
        formDataToSend.append("wcu_count1", formData.wcu_count1);
        formDataToSend.append("wcu_title1", formData.wcu_title1);

        formDataToSend.append("wcu_count2", formData.wcu_count2);
        formDataToSend.append("wcu_title2", formData.wcu_title2);

        formDataToSend.append("wcu_count3", formData.wcu_count3);
        formDataToSend.append("wcu_title3", formData.wcu_title3);

        await API.put(
          `${BASE_URL}/api/admin/settings/67a34a95a6870c076223ca18`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Policy Changed Successfully!", {
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
          {/* Admin Settings Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Admin Settings</h1>
          </header>

          {/* Tab Navigation */}
          <div className="mt-4">
            <div className="flex border-b border-gray-300">
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
              <button
                className={`py-2 px-4 ${
                  activeTab === "policy"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("policy")}
              >
                Policies
              </button>

              <button
                className={`py-2 px-4 ${
                  activeTab === "why_choose_us"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("why_choose_us")}
              >
                Why Choose Us
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-4 max-w-3xl mx-auto w-full">
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

                  <video width="600" controls className="rounded mx-auto my-4">
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

            {activeTab === "policy" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Policies  */}

                {/* Terms Page Content */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Terms and Conditions Content{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="terms_and_conditions"
                    value={formData.terms_and_conditions}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.terms_and_conditions
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter official address"
                  ></textarea>
                  {errors.terms_and_conditions && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.terms_and_conditions}
                    </p>
                  )}
                </div>

                {/* Privacy Policy Page Content */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Privacy Policy Content{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="privacy_policy"
                    value={formData.privacy_policy}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.privacy_policy
                        ? "border-red-500"
                        : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter official address"
                  ></textarea>
                  {errors.privacy_policy && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.privacy_policy}
                    </p>
                  )}
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

            {activeTab === "why_choose_us" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Policies  */}

                {/* wcu count1 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Why Choose Us Count1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="wcu_count1"
                    name="wcu_count1"
                    value={formData.wcu_count1}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.wcu_count1 ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter why choose us count1"
                  />

                  {errors.wcu_count1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wcu_count1}
                    </p>
                  )}
                </div>

                {/* wcu title1 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Why Choose Us Title1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="wcu_title1"
                    name="wcu_title1"
                    value={formData.wcu_title1}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.wcu_title1 ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter why choose us title1"
                  />
                  {errors.wcu_title1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wcu_title1}
                    </p>
                  )}
                </div>

                {/* wcu count2 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Why Choose Us Count2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="wcu_count2"
                    name="wcu_count2"
                    value={formData.wcu_count2}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.wcu_count2 ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter why choose us count2"
                  />

                  {errors.wcu_count2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wcu_count2}
                    </p>
                  )}
                </div>

                {/* wcu title2 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Why Choose Us Title2 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="wcu_title2"
                    name="wcu_title2"
                    value={formData.wcu_title2}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.wcu_title2 ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter why choose us title2"
                  />
                  {errors.wcu_title2 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wcu_title2}
                    </p>
                  )}
                </div>

                {/* wcu count3 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Why Choose Us Count3 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="wcu_count3"
                    name="wcu_count3"
                    value={formData.wcu_count3}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.wcu_count3 ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter why choose us count3"
                  />

                  {errors.wcu_count3 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wcu_count3}
                    </p>
                  )}
                </div>

                {/* wcu title3 */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Why Choose Us Title3 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="wcu_title3"
                    name="wcu_title3"
                    value={formData.wcu_title3}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.wcu_title3 ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter why choose us title3"
                  />
                  {errors.wcu_title3 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.wcu_title3}
                    </p>
                  )}
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
