import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const TestimonialEditForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    designation: "",
    comment: "",
    ratting: "",
  });
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch testimonial data from API
  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await API.get(`/api/admin/testimonials/${id}`);
        const getData = response.data;
        setFormData({
          name: getData.name || "",
          designation: getData.designation || "",
          comment: getData.comment || "",
          ratting: getData.ratting || "",
          image: getData.image || null,
        });
      } catch (error) {
        console.error("Error fetching testimonial data:", error);
      }
    };

    if (id) fetchTestimonial();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required.";
    if (!formData.comment.trim()) newErrors.comment = "Comment is required.";
    if (!formData.ratting.trim()) newErrors.ratting = "Ratting is required.";
    return newErrors;
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
      formDataToSend.append("name", formData.name);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("comment", formData.comment);
      formDataToSend.append("ratting", formData.ratting);

      // Append file only if it's selected
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      await API.put(`${BASE_URL}/api/admin/testimonials/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/testimonials");
      toast.success("Testimonial Updated Successfully!", {
        comment: "top-right",
        autoClose: 3000,
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Testimonial Update failed. Try again.",
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
              Edit Job Testimonial
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
                <img
                  src={BASE_URL + formData.image}
                  alt={`${formData.name}`}
                  className="w-48 h-24 rounded-full mx-auto my-4"
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
                {loading ? "Edit Job Testimonial..." : "Edit Job Testimonial"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TestimonialEditForm;
