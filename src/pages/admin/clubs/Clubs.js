import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
import Loader from "../../../components/Loader";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Clubs = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await API.get("/api/admin/users");

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const clubsFromAPI = response.data.map((club) => ({
          id: club._id || "",
          clubName: club.club_name || "N/A",
          clubLogo: BASE_URL+club.club_logo || "/common/club.png",
          role: club.role || "N/A",
          first_name: club.first_name || "N/A",
          last_name: club.last_name || "N/A",
          phone: club.phone || "N/A",
          email: club.email || "N/A",
          profilePic: club.profile || "/common/man.png",
          status: club.isActive ? "Active" : "Deactivate",
        }));
       
        setData(clubsFromAPI);
        setOriginalData(clubsFromAPI);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setError(error.response?.data?.message || "Failed to fetch clubs");
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  // Handle Delete Club (e.g., delete from API or state)
  const handleDeleteClub = async (clubId) => {
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
          await API.delete(`/api/admin/users/permanent/${clubId}`);
          setData((prevClubs) =>
            prevClubs.filter((club) => club.id !== clubId)
          );
          Swal.fire("Deleted!", "Club has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting club:", error);
          Swal.fire("Error!", "Failed to delete club. Try again.", "error");
        }
      }
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (club) =>
          club.role.toLowerCase().includes(value) ||
          club.first_name.toLowerCase().includes(value) ||
          club.last_name.toLowerCase().includes(value) ||
          club.email.toLowerCase().includes(value)
      );
      setData(filtered);
    }
  };

  const handleStatusChange = async (clubId, newStatus) => {
    try {
      const updatedStatus = newStatus === "true";

      const formData = new FormData();
      formData.append("status", updatedStatus);

      await API.put(`/api/admin/users/${clubId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedData = data.map((club) =>
        club.id === clubId
          ? { ...club, status: newStatus === "true" ? "Active" : "Deactivate" }
          : club
      );
      setData(updatedData);
      toast.success("Club status updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update club status. Try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const columns = [
    {
      name: "Club",
      selector: (row) => (
        <img
          src={row.clubLogo}
          alt={`${row.clubName}`}
          className="w-12 h-12 rounded-full"
        />
      ),
      center: true,
    },
    {
      name: "Club Name",
      selector: (row) => `${row.clubName}`,
      sortable: true,
    },
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
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
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
          className="px-2 py-1 border rounded-md"
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
            className="p-2 mx-4 border rounded shadow-sm outline-none"
            onChange={(e) => {
              const action = e.target.value;
              if (action === "view") {
                navigate(`/admin/club/view/${row.id}`);
              } else if (action === "edit") {
                navigate(`/admin/club/edit/${row.id}`);
              } else if (action === "delete") {
                handleDeleteClub(row.id);
              }
              e.target.value = "";
            }}
          >
            <option value="">Action</option>
            <option value="view">👁️ View</option>
            <option value="edit">✏️ Edit </option>
            <option value="delete">🗑️ Delete</option>
          </select>
        </div>
      ),
      center: true,
    }
    
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
    <div className="bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <div className="overflow-x-auto w-full">
          <main className="flex-1 p-6 space-y-6">
            <header className="flex justify-between items-center flex-wrap gap-4">
              <h1 className="text-3xl font-bold text-gray-800">All Clubs</h1>
              <Link
                to={"/admin/club/create"}
                className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Add New &#43;
              </Link>
            </header>

            <div className="bg-white p-6 rounded shadow">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-800">
                  Clubs List
                </h2>
                <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
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
                <p>Loading clubs...</p>
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

export default Clubs;
