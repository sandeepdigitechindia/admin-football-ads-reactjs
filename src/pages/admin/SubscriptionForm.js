import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Link } from "react-router-dom";

const SubscriptionForm = () => {
  const [subscription, setSubscription] = useState({
    title: "",
    duration: "",
    price: "",
    features: [""],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!subscription.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!subscription.duration.trim()) {
      newErrors.duration = "Duration is required.";
    }
    if (!subscription.price || isNaN(subscription.price)) {
      newErrors.price = "Price must be a valid number.";
    }
    subscription.features.forEach((feature, index) => {
      if (!feature.trim()) {
        newErrors[`feature-${index}`] = "Feature cannot be empty.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setSubscription({ ...subscription, [field]: value });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...subscription.features];
    updatedFeatures[index] = value;
    setSubscription({ ...subscription, features: updatedFeatures });
  };

  const addFeature = () => {
    setSubscription({
      ...subscription,
      features: [...subscription.features, ""],
    });
  };

  const removeFeature = (index) => {
    const updatedFeatures = subscription.features.filter((_, i) => i !== index);
    setSubscription({ ...subscription, features: updatedFeatures });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", subscription);
      // Perform API call or further actions here
      alert("Subscription submitted successfully!");
      setSubscription({ title: "", price: "", features: [""] });
      setErrors({});
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
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create Subscription
            </h1>

            <form onSubmit={handleSubmit} className="">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={subscription.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
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
                  value={subscription.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <select
                  value={subscription.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select Duration</option>
                  <option value="3_months">3 Months</option>
                  <option value="6_months">6 Months</option>
                  <option value="1_year">1 Year</option>
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
                {subscription.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
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
                    {subscription.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="text-red-500 hover:text-red-700"
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
                  className="text-blue-500 hover:text-blue-700"
                >
                  Add Feature
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
export default SubscriptionForm;
