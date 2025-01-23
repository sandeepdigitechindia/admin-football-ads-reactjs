import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // to redirect after logout
import Sidebar from "../../components/club/Sidebar";
const Logout = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    // Add your logout logic here (e.g., clear session, JWT, etc.)
    // Redirect to home or login page after logout
    navigate("/login");
    alert("You have been logged out.");
  };

  // Open modal
  const openModal = () => {
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Logout Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Logout</h1>
          </header>
          <div className="bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                Logout Confirmation
              </h2>

              <div className="flex justify-center gap-4">
                <button
                  onClick={openModal}
                  className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          {/* Modal for Confirmation */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Are you sure you want to log out?
                </h3>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={closeModal}
                    className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Logout;
