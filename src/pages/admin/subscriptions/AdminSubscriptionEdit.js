import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const durations = [
  "1 Month",
  "2 Month",
  "3 Month",
  "4 Month",
  "5 Month",
  "6 Month",
  "7 Month",
  "8 Month",
  "9 Month",
  "10 Month",
  "11 Month",
  "12 Month",
];

const AdminSubscriptionEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    price: "",
    features: [],
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch subscription data from API
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await API.get(`/api/admin/subscriptions/${id}`);
        const postData = response.data;
        setFormData({
          title: postData.title || "",
          price: postData.price || "",
          duration: postData.duration || "",
          features: JSON.parse(postData.features) || "",
        });
        //setFormData(response.data);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    if (id) fetchSubscription();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required.";
    }
    if (!formData.price || isNaN(formData.price)) {
      newErrors.price = "Price must be a valid number.";
    }
    formData.features.forEach((feature, index) => {
      if (!feature.trim()) {
        newErrors[`feature-${index}`] = "Feature cannot be empty.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({ ...formData, features: updatedFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: updatedFeatures });
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
      const updatedData = {
        title: formData.title,
        price: formData.price,
        duration: formData.duration,
        features: JSON.stringify(formData.features),
      };

      await API.put(`${BASE_URL}/api/admin/subscriptions/${id}`, updatedData);
      navigate("/admin/subscriptions");
      toast.success("Subscription Updated Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Subscription Update failed. Try again.",
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
            <h1 className="text-3xl font-bold text-gray-800">Subscriptions</h1>
            <Link
              to={"/admin/subscriptions"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Subscription
            </h1>

            <form onSubmit={handleSubmit} className="">
              {/* Title */}
              <div>
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
                  placeholder="Enter subscription title"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              {/* Duration Dropdown */}
              <div className="mb-4">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Duration <span className="text-red-500">*</span>
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring focus:ring-blue-300`}
                >
                  <option value="">Select your duration</option>
                  {durations.map((duration, index) => (
                    <option key={index} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                )}
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      name="feature"
                      value={feature}
                      onChange={(e) =>
                        handleFeatureChange(index, e.target.value)
                      }
                      className={`w-full p-3 border rounded ${
                        errors[`feature-${index}`]
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder={`Feature ${index + 1}`}
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="w-[100px] py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {errors.feature && (
                  <p className="text-red-500 text-sm mt-1">{errors.feature}</p>
                )}
                <button
                  type="button"
                  onClick={addFeature}
                  className="w-[200px] py-2 my-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Add Feature
                </button>
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
export default AdminSubscriptionEdit;
