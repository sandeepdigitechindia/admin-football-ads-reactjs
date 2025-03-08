import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../api";
import Loader from "../../../components/Loader";
const MeatTags = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchMetaTags = async () => {
      try {
        const response = await API.get("/api/admin/meta-tags");

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const metatagsFromAPI = response.data.map((meta) => ({
          id: meta._id || "",
          title: meta.title || "N/A",
          description: meta.description || "N/A",
          page: meta.page || "N/A",
        }));

        setData(metatagsFromAPI);
        setOriginalData(metatagsFromAPI);
      } catch (error) {
        console.error("Error fetching meta tags:", error);
        setError(error.response?.data?.message || "Failed to fetch meta tags");
      } finally {
        setLoading(false);
      }
    };

    fetchMetaTags();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  // Handle Delete Meta Tag (e.g., delete from API or state)
  const handleDeleteMetaTag = async (metaTagId) => {
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
          await API.delete(`/api/admin/meta-tags/permanent/${metaTagId}`);
          setData((prevMetaTags) =>
            prevMetaTags.filter((meta) => meta.id !== metaTagId)
          );

          Swal.fire("Deleted!", "Meta Tag has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting meta tag:", error);
          Swal.fire("Error!", "Failed to delete meta tag. Try again.", "error");
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
        (meta) =>
          meta.title.toLowerCase().includes(value) ||
          meta.description.toLowerCase().includes(value) ||
          meta.video_link.toLowerCase().includes(value)
      );
      setData(filtered);
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Page Link",
      selector: (row) => row.page,
      sortable: true,
    },

  

    {
      name: "Action",
      cell: (row) => (
        <div className="text-center relative">
          <select
            className="p-2 mx-4 border rounded shadow-sm outline-none"
            onChange={(e) => {
              const action = e.target.value;
              if (action === "edit") {
                navigate(`/admin/meta-tag/edit/${row.id}`);
              } else if (action === "delete") {
                handleDeleteMetaTag(row.id);
              }
              e.target.value = "";
            }}
          >
            <option value="">Action</option>
            <option value="edit">✏️ Edit </option>
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
              <h1 className="text-3xl font-bold text-gray-800">Meta Tags</h1>
              <Link
                to={"/admin/meta-tag/create"}
                className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Add New &#43;
              </Link>
            </header>

            <div className="bg-white p-6 rounded shadow">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-800">
                  Meta Tags List
                </h2>
                <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by title or description..."
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
                <p>Loading Meta Tags...</p>
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

export default MeatTags;
