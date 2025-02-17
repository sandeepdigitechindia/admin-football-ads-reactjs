import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Testimonials = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await API.get("/api/admin/testimonials");

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const getFromAPI = response.data.map((testimonial) => ({
          id: testimonial._id || "",
          image: BASE_URL + testimonial.image || "/common/man.png",
          name: testimonial.name || "N/A",
          designation: testimonial.designation || "N/A",
          comment: testimonial.comment || "N/A",
          ratting: testimonial.ratting || "N/A",
          status: testimonial.status === "true" ? "Active" : "Deactivate",
        }));

        setData(getFromAPI);
        setOriginalData(getFromAPI);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError(
          error.response?.data?.message || "Failed to fetch testimonials"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (testimonial) =>
          testimonial.name.toLowerCase().includes(value) ||
          testimonial.designation.toLowerCase().includes(value) ||
          testimonial.comment.toLowerCase().includes(value)
      );
      setData(filtered);
    }
  };

  const handleStatusChange = async (testimonialId, newStatus) => {
    try {
      const updatedStatus = newStatus === "true";

      const formData = new FormData();
      formData.append("status", updatedStatus);

      await API.put(`/api/admin/testimonials/${testimonialId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedData = data.map((testimonial) =>
        testimonial.id === testimonialId
          ? {
              ...testimonial,
              status: newStatus === "true" ? "Active" : "Deactivate",
            }
          : testimonial
      );
      setData(updatedData);
      toast.success("Testimonial status updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update testimonial status. Try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  // Handle Delete Testimonial (e.g., delete from API or state)
  const handleDeleteTestimonial = async (testimonialId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete(
            `/api/admin/testimonials/permanent/${testimonialId}`
          );
          setData((prevTestimonials) =>
            prevTestimonials.filter(
              (testimonial) => testimonial.id !== testimonialId
            )
          );
          Swal.fire("Deleted!", "Testimonial has been deleted.", "success");
        } catch (error) {
          Swal.fire(
            "Error!",
            "Failed to delete testimonial. Try again.",
            "error"
          );
        }
      }
    });
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.image}
          alt="testimonial"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="font-semibold text-gray-700 text-center">
          {row.name}
        </div>
      ),
      center: true,
    },
    {
      name: "Comment",
      selector: (row) => row.comment,
      sortable: true,
      center: true,
    },

    {
      name: "Designation",
      selector: (row) => row.designation,
      sortable: true,
      center: true,
    },
    {
      name: "Ratting",
      selector: (row) => row.ratting,
      sortable: true,
      center: true,
    },

    {
      name: "Status",
      selector: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Change Status",
      cell: (row) => (
        <select
          value={String(row.status)}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="px-3 py-1 border rounded-md"
        >
          <option value="">Change</option>
          <option value="true">Active</option>
          <option value="false">Deactivate</option>
        </select>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="text-center relative">
          <select
            className="p-2 mx-4 border rounded bg-blue-600 text-white shadow-sm outline-none"
            onChange={(e) => {
              const action = e.target.value;
              if (action === "view") {
                navigate(`/admin/testimonial/view/${row.id}`);
              } else if (action === "edit") {
                navigate(`/admin/testimonial/edit/${row.id}`);
              } else if (action === "delete") {
                handleDeleteTestimonial(row.id);
              }
              e.target.value = "";
            }}
          >
            <option value="" className="">
              Action
            </option>
            <option value="view">👁️ View</option>
            <option value="edit">✏️ Edit</option>
            <option value="delete">🗑️ Delete</option>
          </select>
        </div>
      ),
      center: true,
    },
  ];

  const customStyles = {
    header: {
      style: {
        backgroundColor: "#f9fafb",
        padding: "16px",
        fontWeight: "bold",
        fontSize: "16px",
        color: "#374151",
        textAlign: "center",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#e5e7eb",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#4b5563",
        textAlign: "center",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#374151",
        backgroundColor: "#fff",
        marginTop: "10px",
        marginBottom: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        textAlign: "center",
        "&:hover": {
          backgroundColor: "#f3f4f6",
          borderRadius: "10px",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f9fafb",
        padding: "8px",
      },
      pageButtonsStyle: {
        color: "#3b82f6",
        fill: "#3b82f6",
        "&:hover": {
          backgroundColor: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <div className="overflow-x-auto w-full">
        <main className="flex-1 p-6 space-y-6">
          {/* Testimonials Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">
              All Testimonials
            </h1>
            <Link
              to={"/admin/testimonial/create"}
              className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Add New &#43;
            </Link>
          </header>

          <div className="bg-white p-6 rounded shadow">
            {/* Header with Search Input */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">
                All Testimonials
              </h2>
              <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </div>
            </div>

            {loading ? (
              <p>Loading testimonials...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={data}
                  pagination
                  highlightOnHover
                  striped
                  responsive
                  customStyles={customStyles}
                />
              </div>
            )}
          </div>
        </main>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
