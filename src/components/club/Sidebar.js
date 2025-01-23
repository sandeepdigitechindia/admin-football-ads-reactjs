import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaClipboardList,
  FaDollarSign,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", link: "/club/dashboard", icon: <FaTachometerAlt /> },
    { name: "Posts", link: "/club/posts", icon: <FaClipboardList /> },
    { name: "Subscriptions", link: "/club/subscriptions", icon: <FaDollarSign /> },
    { name: "Settings", link: "/club/settings", icon: <FaCogs /> },
    { name: "Logout", link: "/club/logout", icon: <FaSignOutAlt /> },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 text-gray-800 bg-white p-2 rounded-md shadow-md"
        onClick={toggleMenu}
      >
        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
      </button>

      {/* Sidebar (Responsive) */}
      <aside
        className={`fixed inset-y-0 left-0 ${
          isOpen ? "z-50" : "z-40"
        } transform lg:transform-none lg:relative lg:translate-x-0 w-64 bg-white shadow-md p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto`}
      >
        <nav className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Menu</h2>
          <ul className="space-y-3">
            {menuItems.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu.link}
                  className={`flex items-center py-3 px-4 rounded-lg transition duration-300 ${
                    location.pathname === menu.link
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-blue-500 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)} // Close menu on mobile after clicking a link
                >
                  <span className="text-lg mr-3">{menu.icon}</span>
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for Mobile View */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
