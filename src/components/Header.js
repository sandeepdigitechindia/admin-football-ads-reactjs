import React, { useEffect,useState,useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/20/solid";

import API from "../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function ClubHeader() {
  const [showModal, setShowModal] = useState(false);
  const [settingData, setSettingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);

    useEffect(() => {
      const fetchSettingData = async () => {
        try {
          const response = await API.get("/api/settings");
          setSettingData(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching home data:", error);
          setLoading(false);
        }
      };
  
      fetchSettingData();
    }, []);
    if (loading) {
      return <div className="text-center text-lg font-bold">Loading...</div>;
    }
  
    if (!settingData) {
      return (
        <div className="text-center text-lg font-bold text-red-500">
          Error loading data.
        </div>
      );
    }

  // Open modal
  const openModal = () => {
    setShowModal(true);
  };
  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <header className="bg-gray-900 text-gray-300 sticky top-0 z-50 shadow-lg">
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
                onClick={logout}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
              
            </div>
          </div>
        </div>
      )}
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{settingData.site_name}</span>
            <img alt={settingData.site_name} src={BASE_URL + settingData.site_logo} className="h-8 w-auto" />
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-2 text-sm font-semibold text-white outline-none">
              <UserCircleIcon className="h-6 w-6 text-white" />
              <span>Admin Profile</span>
            </PopoverButton>
            <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5">
              <div className="p-2">
              <Link
                  to="/admin/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="#"
                  onClick={openModal}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </nav>
    </header>
  );
}
