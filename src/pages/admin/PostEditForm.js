import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    position: "",
    salary: "",
    location: "",
    club: "",
  });
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await API.get("/api/admin/users?role=club");
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const clubsFromAPI = response.data.map((club) => ({
          id: club._id || "",
          clubName: club.club_name || "N/A",
        }));

        setClubs(clubsFromAPI);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  // Fetch post data from API
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get(`/api/admin/posts/${id}`);
        const postData = response.data;
        setFormData({
          title: postData.title || "",
          description: postData.description || "",
          position: postData.position || "",
          salary: postData.salary || "",
          location: postData.location || "",
          image: postData.image || null,
          club: postData.userId?._id || "",
        });
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    if (id) fetchPost();
  }, [id]);

  // Ensure club is set only after both data are fetched
  useEffect(() => {
    if (formData.club && clubs.length > 0) {
      const clubExists = clubs.some((club) => club.id === formData.club);
      if (!clubExists) {
        console.warn("Club not found in list, resetting...");
        setFormData((prev) => ({ ...prev, club: "" }));
      }
    }
  }, [formData.club, clubs]);

  // Debugging: Check selected club value
  useEffect(() => {
    console.log("Selected Club ID:", formData.club);
    console.log("Available Clubs:", clubs);
  }, [formData, clubs]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.position.trim()) newErrors.position = "Position is required.";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.club.trim()) newErrors.club = "club is required.";
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
      formDataToSend.append("title", formData.title);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("position", formData.position);
      formDataToSend.append("salary", formData.salary);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("userId", formData.club);

      // Append file only if it's selected
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      await API.put(`${BASE_URL}/api/admin/posts/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/admin/posts");
      toast.success("Post Updated Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Post Update failed. Try again.",
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
            <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
            <Link
              to={"/admin/posts"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Job Post
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Club Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="club"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Club <span className="text-red-500">*</span>
                </label>
                <select
                  id="club"
                  name="club"
                  value={formData.club}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.club ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring focus:ring-blue-300`}
                >
                  <option value="">Select your club</option>
                  {clubs.map((club, index) => (
                    <option key={index} value={club.id}>
                      {club.clubName}
                    </option>
                  ))}
                </select>
                {errors.club && (
                  <p className="text-red-500 text-sm mt-1">{errors.club}</p>
                )}
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
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

              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Position */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.position ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                )}
              </div>

              {/* Salary */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.salary ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                )}
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Edit Job Post..." : "Edit Job Post"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostForm;
