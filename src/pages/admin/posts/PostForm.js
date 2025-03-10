import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    long_description: "",
    position: "",
    salary: "",
    location: "",
    club: "",
  });

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
        console.log(clubsFromAPI);
        setClubs(clubsFromAPI);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.image) newErrors.image = "Image is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.long_description.trim())
      newErrors.long_description = "Long Description is required.";
    if (!formData.position.trim()) newErrors.position = "Position is required.";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.club.trim()) newErrors.club = "club is required.";
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
      data.append("title", formData.title);
      data.append("image", formData.image);
      data.append("description", formData.description);
      data.append("long_description", formData.long_description);
      data.append("position", formData.position);
      data.append("salary", formData.salary);
      data.append("location", formData.location);
      data.append("userId", formData.club);

      await API.post(`${BASE_URL}/api/admin/posts`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/posts");
      toast.success("Post Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({
        title: "",
        image: null,
        description: "",
        long_description: "",
        position: "",
        salary: "",
        location: "",
        club: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Post creation failed. Try again.",
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
              Create Job Post
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

              {/* Long Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Long Description
                </label>
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.long_description}
                  config={ {
                    licenseKey: process.env.REACT_APP_CKEDITOR_LICENSE_KEY,
                 
                } }
                  onChange={(event, editor) => {
                    const content = editor.getData();
                    setFormData({ ...formData, long_description: content });
                  }}
                />
                {/* <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.long_description
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                ></textarea> */}
                {errors.long_description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.long_description}
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
                {loading ? "Create Post Post..." : "Create Post Post"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostForm;
