import React, { useState, useRef } from "react";
import Sidebar from "../../components/admin/Sidebar";
import DataTable from "react-data-table-component";
import { Link, useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const navigate = useNavigate();

  // Initial subscriptions data
  const initialSubscriptions = [
    {
      id: 1,
      title: "Basic Plan",
      price: "$10/month",
      features: ["Feature 1", "Feature 2", "Feature 3"],
      status: "Active",
    },
    {
      id: 2,
      title: "Premium Plan",
      price: "$20/month",
      features: ["Feature A", "Feature B", "Feature C"],
      status: "Deactivate",
    },
    {
      id: 3,
      title: "Enterprise Plan",
      price: "$50/month",
      features: ["Feature X", "Feature Y", "Feature Z"],
      status: "Active",
    },
  ];

  const [data, setData] = useState(initialSubscriptions);
  const [searchTerm, setSearchTerm] = useState("");

  // Dropdown state
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  // Handle Delete Subscription
  const handleDeleteSubscription = (subscriptionId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this subscription?"
    );
    if (isConfirmed) {
      setData(data.filter((sub) => sub.id !== subscriptionId));
      alert("Subscription deleted successfully!");
    }
  };

  // Handle Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = initialSubscriptions.filter(
      (sub) =>
        sub.title.toLowerCase().includes(value) ||
        sub.price.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  // Handle Status Change
  const handleStatusChange = (subscriptionId, newStatus) => {
    const updatedData = data.map((sub) =>
      sub.id === subscriptionId ? { ...sub, status: newStatus } : sub
    );
    setData(updatedData);
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Features",
      selector: (row) => (
        <ul>
          {row.features.map((feature, index) => (
            <li key={index} className="text-sm text-gray-700">
              - {feature}
            </li>
          ))}
        </ul>
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
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition flex items-center gap-2"
            onClick={() =>
              setDropdownOpen(dropdownOpen === row.id ? null : row.id)
            }
          >
            <span>Action</span>
            <i
              className={`fas fa-chevron-down ${
                dropdownOpen === row.id ? "transform rotate-180" : ""
              }`}
            ></i>
          </button>

          {dropdownOpen === row.id && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg opacity-100 pointer-events-auto z-50"
            >
              <ul className="list-none p-0 m-0">
                <li>
                  <button
                    onClick={() => navigate(`/admin/subscription/edit/${row.id}`)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300"
                  >
                    <i className="fas fa-edit mr-2"></i> Edit Subscription
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleDeleteSubscription(row.id)}
                    className="w-full text-left py-2 px-4 hover:bg-gray-200 transition duration-300 text-red-500"
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Delete
                  </button>
                </li>
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
        
          <main className="flex-1 p-6 space-y-6">
            <header className="flex justify-between items-center flex-wrap gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Subscriptions</h1>
              <Link
                to={"/admin/subscription/create"}
                className="py-2 px-6 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Add New &#43;
              </Link>
            </header>

            <div className="bg-white p-6 rounded shadow">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-800">
                  Subscriptions List
                </h2>
                <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search by title or price..."
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
  );
};

export default Subscriptions;
