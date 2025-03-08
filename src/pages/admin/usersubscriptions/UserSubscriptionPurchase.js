import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import DataTable from "react-data-table-component";
import API from "../../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const UserSubscriptionPurchase = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    const fetchSubscriptionPurchase = async () => {
      try {
        const response = await API.get(
          "/api/admin/user-subscriptions/purchase"
        );

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const purchasesFromAPI = response.data.map((purchase) => ({
          id: purchase._id || "",

          user:
            {
              first_name: purchase.userId.first_name,
              last_name: purchase.userId.last_name,
              email: purchase.userId.email,
              phone: purchase.userId.phone,
              profilePic:
                BASE_URL + purchase.userId.profile || "/common/man.png",
            } || "N/A",
          subscription: {
            title: purchase.subscriptionId.title,
            price: "$" + purchase.subscriptionId.price,
            features: purchase.subscriptionId.features,
          },
          date:
            new Date(purchase.createdAt).toLocaleDateString("en-GB") || "N/A",
          transactionId: purchase.transactionId,
        }));

        setData(purchasesFromAPI);
        setOriginalData(purchasesFromAPI);
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setError(error.response?.data?.message || "Failed to fetch clubs");
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionPurchase();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = originalData.filter(
      (transaction) =>
        transaction.user.first_name.toLowerCase().includes(value) ||
        transaction.user.last_name.toLowerCase().includes(value) ||
        transaction.user.email.toLowerCase().includes(value) ||
        transaction.subscription.title.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  const columns = [
    {
      name: "User",
      selector: (row) => (
        <div className="flex items-center gap-2">

          <img
            src={row.user.profilePic}
            alt={`${row.user.first_name} ${row.user.last_name}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-medium">{`${row.user.first_name} ${row.user.last_name}`}</p>
            <p className="text-sm text-gray-500">{row.user.email}</p>
          </div>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.user.phone,
      sortable: true,
    },
    {
      name: "Subscription",
      selector: (row) => (
        <div>
          <p className="font-medium">{row.subscription.title}</p>
          <p className="text-sm text-gray-500">{row.subscription.price}</p>
        </div>
      ),
    },
    {
      name: "Transaction ID",
      selector: (row) => row.transactionId,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
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
            <h1 className="text-3xl font-bold text-gray-800">
              User Subscription Transaction History
            </h1>
          </header>
          <div className="bg-white p-6 rounded shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">
                Transactions
              </h2>
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
  );
};

export default UserSubscriptionPurchase;
