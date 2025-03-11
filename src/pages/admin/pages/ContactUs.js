import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../../api";
import Loader from "../../../components/Loader";
const ContactUs = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchContactUs = async () => {
      try {
        const response = await API.get("/api/admin/contact");

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const getFromAPI = response.data.map((contact) => ({
          id: contact._id || "",
          name: contact.name || "N/A",
          email: contact.email || "N/A",
          number: contact.number || "N/A",
          subject: contact.subject || "N/A",
          message: contact.msg || "N/A",
          status: contact.status === "true" ? "Seen" : "Unseen",
        }));

        setData(getFromAPI);
        setOriginalData(getFromAPI);
      } catch (error) {
        console.error("Error fetching contact:", error);
        setError(error.response?.data?.message || "Failed to fetch contact");
      } finally {
        setLoading(false);
      }
    };

    fetchContactUs();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (contact) =>
          contact.name.toLowerCase().includes(value) ||
          contact.email.toLowerCase().includes(value) ||
          contact.number.toLowerCase().includes(value)
      );
      setData(filtered);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const updatedStatus = newStatus === "true";

      const requestBody = {
        status: updatedStatus,
      };

      await API.put(`/api/admin/contact/${contactId}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedData = data.map((contact) =>
        contact.id === contactId
          ? {
              ...contact,
              status: newStatus === "true" ? "Seen" : "Unseen",
            }
          : contact
      );
      setData(updatedData);
      toast.success("Contact status updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update contact status. Try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  // Handle Delete Contact Us (e.g., delete from API or state)
  const handleDeleteContact = async (contactId) => {
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
          await API.delete(`/api/admin/contact/permanent/${contactId}`);
          setData((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== contactId)
          );
          Swal.fire("Deleted!", "Contact has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete contact. Try again.", "error");
        }
      }
    });
  };

  const columns = [
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
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      center: true,
    },

    {
      name: "Number",
      selector: (row) => row.number,
      sortable: true,
      center: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      center: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
      center: true,
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
        <div className="text-center relative">
          <select
            className="p-2 mx-4 border rounded shadow-sm outline-none"
            onChange={(e) => {
              const action = e.target.value;
              if (action === "delete") {
                handleDeleteContact(row.id);
              }
              e.target.value = "";
            }}
          >
            <option value="" className="">
              Action
            </option>
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
            <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
          </header>
          <div className="bg-white p-6 rounded shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">Contacts</h2>
              <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by name, email, or subscription..."
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
              <p>Loading contacts...</p>
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

export default ContactUs;
