import React, { useState,useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;;

const MetaTagEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    page: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

      // Fetch user data from API
  useEffect(() => {
    const fetchMetaTag = async () => {
      try {
        const response = await API.get(`/api/admin/meta-tags/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching meta tag data:", error);
      }
    };

    if (id) fetchMetaTag();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }
    if (!formData.page.trim()) {
      newErrors.page = "Page Link is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, image: e.target.files[0] });
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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("page", formData.page);
      // Append file only if it's selected
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      await API.put(`${BASE_URL}/api/admin/meta-tags/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      navigate("/admin/meta-tags");
      toast.success("Meta Tag Updated Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Meta Tag Update failed. Try again.",
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
            <h1 className="text-3xl font-bold text-gray-800">Meta tags</h1>
            <Link
              to={"/admin/meta-tags"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Meta Tag
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
                  placeholder="Enter meta title"
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
                  placeholder="Enter meta description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Image */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full p-3 border ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                <img
                  src={BASE_URL + formData.image}
                  alt={`${formData.title}`}
                  className="w-48 h-24 rounded-full mx-auto my-4"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              {/* Page Link */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Page Link
                </label>
                <input
                  type="text"
                  name="page"
                  value={formData.page}
                  onChange={handleChange}
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.page ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter Page Link"
                />
                {errors.page && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.page}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Update..." : "Update"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
export default MetaTagEdit;
