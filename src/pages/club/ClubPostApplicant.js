import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import Sidebar from "../../components/club/Sidebar";

// Dummy data for applicants (Replace with actual data from API or state)
const initialApplicants = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "+1 234 567 890",
    email: "johndoe@example.com",
    profilePic: "/common/man.png",
    cv: "/common/johndoe-cv.pdf",
    status: "Open", // Can be Open, Close, Archived
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1 234 567 891",
    email: "janesmith@example.com",
    profilePic: "/common/man.png",
    cv: "/common/janesmith-cv.pdf",
    status: "Close", // Can be Open, Close, Archived
  },
  {
    id: 3,
    firstName: "Mark",
    lastName: "Johnson",
    phone: "+1 234 567 892",
    email: "markjohnson@example.com",
    profilePic: "/common/man.png",
    cv: "/common/markjohnson-cv.pdf",
    status: "Archived", // Can be Open, Close, Archived
  },
];

const ClubPostApplicant = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState(initialApplicants);
  const [searchTerm, setSearchTerm] = useState("");

  // Handle status change
  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === applicantId
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
  };

  // Filtered applicants based on search term
  const filteredApplicants = applicants.filter(
    (applicant) =>
      applicant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns for the DataTable
  const columns = [
    {
      name: "Profile",
      selector: (row) => (
        <img
          src={row.profilePic}
          alt={`${row.firstName} ${row.lastName}`}
          className="w-12 h-12 rounded-full"
        />
      ),
      center: true,
    },
    {
      name: "Name",
      selector: (row) => `${row.firstName} ${row.lastName}`,
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
            row.status === "Open"
              ? "bg-green-100 text-green-700"
              : row.status === "Close"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
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
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="px-3 py-1 border rounded-md"
        >
          <option value="Open">Open</option>
          <option value="Close">Close</option>
          <option value="Archived">Archived</option>
        </select>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="text-center">
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition shadow"
            onClick={() => navigate(`/club/post/applicant/view/${row.id}`)}
          >
            View
          </button>
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
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-800">
              Applicants for Post
            </h2>
            <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
            data={filteredApplicants}
            pagination
            customStyles={customStyles}
            highlightOnHover
          />
        </div>
      </div>
    </div>
  );
};

export default ClubPostApplicant;
