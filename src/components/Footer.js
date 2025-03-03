import React, { useEffect, useState } from "react";
import API from "../api";
const Footer = () => {
  const [settingData, setSettingData] = useState(null);
  const [loading, setLoading] = useState(true);

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
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} {settingData.site_name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
