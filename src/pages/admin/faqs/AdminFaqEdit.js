import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AdminFaqEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Fetch faq data from API
  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await API.get(`/api/admin/faqs/${id}`);
        const postData = response.data;
        setFormData({
          question: postData.question || "",
          answer: postData.answer || "",
        });
        //setFormData(response.data);
      } catch (error) {
        console.error("Error fetching faq data:", error);
      }
    };

    if (id) fetchFaq();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!formData.question.trim()) {
      newErrors.question = "Question is required.";
    }
    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required.";
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
      const updatedData = {
        question: formData.question,
        answer: formData.answer,
      };
      await API.put(`${BASE_URL}/api/admin/faqs/${id}`, updatedData);
      navigate("/admin/faqs");
      toast.success("Faq Updated Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Faq Update failed. Try again.",
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
            <h1 className="text-3xl font-bold text-gray-800">Faqs</h1>
            <Link
              to={"/admin/faqs"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Faq</h1>

            <form onSubmit={handleSubmit} className="">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.question ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter subscription question"
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">{errors.question}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Answer
                </label>
                <textarea
                  name="answer"
                  value={formData.answer}
                  onChange={handleChange}
                  className={`mt-1 w-full p-3 border rounded ${
                    errors.answer ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter faq answer"
                ></textarea>
                {errors.answer && (
                  <p className="text-red-500 text-sm mt-1">{errors.answer}</p>
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
export default AdminFaqEdit;
