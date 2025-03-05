import React, { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ServiceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_link: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!formData.video_link.trim()) {
      newErrors.video_link = "Video Link is required.";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await API.post(`${BASE_URL}/api/admin/services`, {
        title: formData.title,
        description: formData.description,
        video_link: formData.video_link,
      });
      navigate("/admin/services");
      toast.success("Service Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({
        title: "",
        description: "",
        video_link: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Service Create failed. Try again.",
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
            <h1 className="text-3xl font-bold text-gray-800">Services</h1>
            <Link
              to={"/admin/services"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create Service
            </h1>

            <form onSubmit={handleSubmit} className="">
              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter service title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Video Link */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Video Link
                </label>
                <input
                  type="text"
                  name="video_link"
                  value={formData.video_link}
                  onChange={handleChange}
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.video_link ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Video Link"
                />
                {errors.video_link && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.video_link}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Submit..." : "Submit"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
export default ServiceForm;
