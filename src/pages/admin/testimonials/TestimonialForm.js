import React, { useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    designation: "",
    ratting: "",
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.image) newErrors.image = "Image is required.";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required.";
    if (!formData.comment.trim()) newErrors.comment = "Comment is required.";
    if (!formData.ratting.trim()) newErrors.ratting = "Ratting is required.";
    return newErrors;
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
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
      data.append("name", formData.name);
      data.append("image", formData.image);
      data.append("designation", formData.designation);
      data.append("comment", formData.comment);
      data.append("ratting", formData.ratting);
    
      await API.post(`${BASE_URL}/api/admin/testimonials`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/testimonials");
      toast.success("Testimonial Created Successfully!", {
        comment: "top-right",
        autoClose: 3000,
      });

      setFormData({
        name: "",
        image: null,
        designation: "",
        comment: "",
        ratting: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Testimonial creation failed. Try again.",
        {
          comment: "top-right",
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
            <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
            <Link
              to={"/admin/testimonials"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create Job Testimonial
            </h1>
            <form onSubmit={handleSubmit}>
           
              {/* Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              {/* Designation */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Designation
                </label>
                <textarea
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.designation ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                ></textarea>
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.designation}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Comment
                </label>
                <input
                  type="text"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.comment ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">{errors.comment}</p>
                )}
              </div>

              {/* Ratting */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Ratting
                </label>
                <input
                  type="text"
                  name="ratting"
                  value={formData.ratting}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.ratting ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.ratting && (
                  <p className="text-red-500 text-sm mt-1">{errors.ratting}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Create Post Post..." : "Create Post Post"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestimonialForm;
