import React, { useState, useRef } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DataTable from "react-data-table-component";
import {Link, useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const initialUsers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      phone: "+1 234 567 890",
      email: "johndoe@example.com",
      profilePic: "/common/man.png",
      cv: "/common/johndoe-cv.pdf",
      status: "Active",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      phone: "+1 234 567 891",
      email: "janesmith@example.com",
      profilePic: "/common/man.png",
      cv: "/common/janesmith-cv.pdf",
      status: "Deactivate",
    },
    {
      id: 3,
      firstName: "Mark",
      lastName: "Johnson",
      phone: "+1 234 567 892",
      email: "markjohnson@example.com",
      profilePic: "/common/man.png",
      cv: "/common/markjohnson-cv.pdf",
      status: "Active",
    },
  ];

  const [data, setData] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  // Handle Delete User (e.g., delete from API or state)
  const handleDeleteUser = (userId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      setData(data.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = initialUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(value) ||
        user.lastName.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  const handleStatusChange = (userId, newStatus) => {
    const updatedData = data.map((user) =>
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setData(updatedData);
  };

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
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="px-3 py-1 border rounded-md"
        >
          <option value="Active">Active</option>
          <option value="Deactivate">Deactivate</option>
        </select>
      ),
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
                {/* View user Option */}
                <li>
                  <button
                    onClick={() => navigate(`/admin/user/view/${row.id}`)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300"
                  >
                    <i className="fas fa-eye mr-2"></i> View User
                  </button>
                </li>

                {/* Edit user Option */}
                <li>
                  <button
                    onClick={() => navigate(`/admin/user/edit/${row.id}`)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300"
                  >
                    <i className="fas fa-edit mr-2"></i> Edit User
                  </button>
                </li>

                {/* Delete user Option */}
                <li>
                  <button
                    onClick={() => handleDeleteUser(row.id)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300 text-red-500"
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Delete User
                  </button>
                </li>

                {/* Applicants Option */}
                {/* <li>
                    <button
                      onClick={() => navigate(`/admin/user/applicants/${row.id}`)}
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

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <div className="overflow-x-auto">
        <main className="flex-1 p-6 space-y-6">
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
            <Link
              to={"/admin/user/create"}
              className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Add New &#43;
            </Link>
          </header>

          <div className="bg-white p-6 rounded shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">Users List</h2>
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
        </main>
        </div>
      </div>
    </div>
  );
};

export default Users;
