import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/club/Sidebar";
import DataTable from "react-data-table-component";
const Dashboard = () => {
  const navigate = useNavigate();
  const initialData = [
    {
      id: 1,
      image: "/common/club.png",
      name: "Club 1",
      title: "Post Title 1",
      applicantsCount: 5,
      date: "Jan 10, 2025",
      status: "Open",
    },
    {
      id: 2,
      image: "/common/club.png",
      name: "Club 2",
      title: "Post Title 2",
      applicantsCount: 2,
      date: "Jan 9, 2025",
      status: "Close",
    },
    {
      id: 3,
      image: "/common/club.png",
      name: "Club 3",
      title: "Post Title 3",
      applicantsCount: 8,
      date: "Jan 8, 2025",
      status: "Archived",
    },
    {
      id: 4,
      image: "/common/club.png",
      name: "Club 4",
      title: "Another Post",
      applicantsCount: 3,
      date: "Jan 7, 2025",
      status: "Open",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  const columns = [
    {
      name: "Club",
      selector: (row) => (
        <img
          src={row.image}
          alt="club"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Club Name",
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
      name: "Job Title",
      selector: (row) => row.title,
      sortable: true,
      center: true,
    },

    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => (
        <div className="text-gray-500 text-center">{row.date}</div>
      ),
      center: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.status === "Open"
              ? "bg-green-100 text-green-700"
              : row.status === "Close"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          } text-center`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Applicants with Counts",
      selector: (row) => row.applicantsCount,
      sortable: true,
      cell: (row) => (
        <div className="text-sm text-gray-600 text-center">
          {/* Circle with applicant count and onClick event */}
          <div
            className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full cursor-pointer"
            onClick={() => navigate(`/club/post/applicants/${row.id}`)} // Navigate to applicants page
          >
            {row.applicantsCount}
          </div>{" "}
          Applicants
        </div>
      ),
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="text-center relative">
          {/* Action Button */}
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
            onClick={() =>
              setDropdownOpen(dropdownOpen === row.id ? null : row.id)
            } // Toggle dropdown
          >
            <span>Action</span>
            {/* Add a dropdown arrow icon */}
            <i
              className={`fas fa-chevron-down ${
                dropdownOpen === row.id ? "transform rotate-180" : ""
              }`}
            ></i>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen === row.id && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-100 pointer-events-auto z-50"
            >
              <ul className="list-none p-0 m-0">
                {/* View Post Option */}
                <li>
                  <button
                    onClick={() => navigate(`/club/post/view/${row.id}`)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300"
                  >
                    <i className="fas fa-eye mr-2"></i> View Post
                  </button>
                </li>

                {/* Edit Post Option */}
                <li>
                  <button
                    onClick={() => navigate(`/club/post/edit/${row.id}`)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300"
                  >
                    <i className="fas fa-edit mr-2"></i> Edit Post
                  </button>
                </li>

                {/* Delete Post Option */}
                <li>
                  <button
                    onClick={() => handleDeletePost(row.id)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300 text-red-500"
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Delete Post
                  </button>
                </li>

                {/* Applicants Option */}
                {/* <li>
                    <button
                      onClick={() => navigate(`/club/post/applicants/${row.id}`)}
                      className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300"
                    >
                      <i className="fas fa-users mr-2"></i> Applicants
                    </button>
                  </li> */}
              </ul>
            </div>
          )}
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = initialData.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  // Handle Delete Post (e.g., delete from API or state)
  const handleDeletePost = (postId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (isConfirmed) {
      setData(data.filter((post) => post.id !== postId));
      alert("Post deleted successfully!");
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Dashboard Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          </header>
          {/* Cards Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Total Added Posts",
                count: 120,
                gradient: "from-blue-500 via-indigo-500 to-purple-500",
                shadow: "shadow-blue-500/50",
              },
              {
                title: "Active Subscriptions",
                count: 2,
                gradient: "from-green-500 via-teal-500 to-emerald-500",
                shadow: "shadow-green-500/50",
              },
              {
                title: "Job Reply Messages",
                count: 3,
                gradient: "from-red-500 via-pink-500 to-rose-500",
                shadow: "shadow-red-500/50",
              },
            ].map((card, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-r ${card.gradient} p-4 rounded-xl text-white transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${card.shadow}`}
              >
                {/* Card Content */}
                <h3 className="text-md font-semibold mb-2">{card.title}</h3>
                <p className="text-3xl font-extrabold mb-3">{card.count}</p>

                {/* Align button to bottom-right */}
                <div className="absolute bottom-4 right-4">
                  <button className="bg-white text-gray-800 py-2 px-4 rounded shadow hover:bg-gray-100 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </section>

          <div className="bg-white p-6 rounded shadow-md">
            {/* Header with Search Input */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">
                Recent Added Posts
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

          {/* Active Subscription */}
          <section className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Active Subscription
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <p className="text-gray-700">
                You are currently subscribed to the <strong>Pro Plan</strong>,
                renewing on <strong>Feb 10, 2025</strong>.
              </p>
              <Link
                to="/club/subscriptions" // Add the route to club subscription page
                className="mt-4 sm:mt-0 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Manage Subscription
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
