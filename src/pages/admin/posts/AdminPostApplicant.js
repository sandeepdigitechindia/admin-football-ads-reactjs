import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import Sidebar from "../../../components/admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
import Loader from "../../../components/Loader";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AdminPostApplicant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get(
          `/api/admin/posts/applicants?postId=${id}`
        );

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const usersFromAPI = response.data.map((user) => ({
          id: user._id || "",
          first_name: user.userId.first_name || "N/A",
          last_name: user.userId.last_name || "N/A",
          phone: user.userId.phone || "N/A",
          email: user.userId.email || "N/A",
          profilePic: BASE_URL + user.userId.profile || "/common/man.png",
          cv: BASE_URL + user.userId.upload_cv || "#",
          status: user.status === "true" ? "Seen" : "Unseen",
          applicantId: user.userId._id || "",
        }));

        setData(usersFromAPI);
        setOriginalData(usersFromAPI);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.response?.data?.message || "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const updatedStatus = newStatus === "true";

      await API.put(
        `/api/admin/posts/applicants/${userId}`,
        { status: updatedStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedData = data.map((user) =>
        user.id === userId
          ? { ...user, status: newStatus === "true" ? "Seen" : "Unseen" }
          : user
      );
      setData(updatedData);
      toast.success("Applicant status updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update applicant status. Try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (user) =>
          user.first_name.toLowerCase().includes(value) ||
          user.last_name.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value)
      );
      setData(filtered);
    }
  };

  const columns = [
    {
      name: "Profile",
      selector: (row) => (
        <img
          src={row.profilePic}
          alt={`${row.first_name} ${row.last_name}`}
          className="w-12 h-12 rounded-full"
        />
      ),
      center: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "CV",
      selector: (row) => (
        <a
          href={row.cv}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View CV
        </a>
      ),
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.status === "Seen"
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
          <option value="true">Seen</option>
          <option value="false">Unseen</option>
        </select>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="text-center">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition shadow"
            onClick={() =>
              navigate(`/admin/post/applicant/view/${row.applicantId}`)
            }
          >
            View
          </button>
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
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Applicants for Post
          </h1>
        </header>
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-800">
              Applicants for Post
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

          {/* Data Table */}
          {loading ? (
            <p>Loading users...</p>
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
      </div>
    </div>
  );
};

export default AdminPostApplicant;
