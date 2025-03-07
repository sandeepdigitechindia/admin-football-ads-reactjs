import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaDollarSign,
  FaMoneyBill,
  FaCogs,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
  FaTools,
  FaQuoteLeft,
  FaComments,
  FaEnvelope,
  FaQuestionCircle,
} from "react-icons/fa";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
 
  const [showModal, setShowModal] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const { admin, logout } = useContext(AuthContext);

  const toggleSubMenu = (menuName) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  // Open modal
  const openModal = () => {
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  const menuItems = [
    { name: "Dashboard", link: "/admin/dashboard", icon: <FaTachometerAlt /> },
    {
      name: "Users",
      link: "/admin/users",
      icon: <FaUsers />,
      subMenu: [
        { name: "All Users", link: "/admin/users" },
        { name: "All Clubs", link: "/admin/clubs" },
      ], // Add sub-menu under "Users"
    },
    { name: "Posts", link: "/admin/posts", icon: <FaClipboardList /> },
    {
      name: "Club Subscriptions",
      link: "/admin/subscriptions",
      icon: <FaDollarSign />,
      subMenu: [
        { name: "Manage Subscriptions", link: "/admin/subscriptions" },
        {
          name: "Subscription Purchase",
          link: "/admin/subscription-purchase",
        },
      ],
    },

    {
      name: "Player Subscriptions",
      link: "/admin/user-subscriptions",
      icon: <FaMoneyBill />,
      subMenu: [
        { name: "Manage Subscriptions", link: "/admin/user-subscriptions" },
        {
          name: "Subscription Purchase",
          link: "/admin/user-subscription-purchase",
        },
      ],
    },
    {
      name: "Services",
      link: "/admin/services",
      icon: <FaTools />,
    },
    {
      name: "Testimonials",
      link: "/admin/testimonials",
      icon: <FaQuoteLeft />,
    },
    {
      name: "Faqs",
      link: "/admin/faqs",
      icon: <FaQuestionCircle />,
    },
    {
      name: "Contact Us",
      link: "/admin/contact-us",
      icon: <FaComments />,
    },
    {
      name: "Newsletters",
      link: "/admin/newsletters",
      icon: <FaEnvelope />,
    },
    { name: "Settings", link: "/admin/settings", icon: <FaCogs /> },
    { name: "Logout", link: "#", icon: <FaSignOutAlt />, onClick: openModal },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
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
              {admin && (
              <button
                onClick={logout}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>)}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden fixed top-4 right-4 z-50 text-gray-800 bg-white p-2 rounded-md shadow"
        onClick={toggleMenu}
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      <aside
        className={`fixed inset-y-0 left-0 ${
          isOpen ? "z-50" : "z-40"
        } transform lg:transform-none lg:relative lg:translate-x-0 w-64 bg-gray-900 shadow-lg p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:block lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 overflow-y-auto`}
      >
        <nav className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-4">Menu</h2>
          <ul className="space-y-3">
            {menuItems.map((menu, index) => (
              <li key={index}>
                {/* Render dropdown for "Users" menu */}
                {menu.subMenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubMenu(menu.name)}
                      className={`flex items-center py-3 px-4 rounded-lg w-full text-left transition duration-300 ${
                        location.pathname.includes(menu.link)
                          ? "bg-blue-700 text-white"
                          : "text-gray-300 hover:bg-blue-700 hover:text-white"
                      }`}
                    >
                      <span className="text-lg mr-3">{menu.icon}</span>
                      {menu.name}
                      <span className="ml-auto">
                        {openSubMenus[menu.name] ? (
                          <FaChevronUp className="text-white" />
                        ) : (
                          <FaChevronDown className="text-white" />
                        )}
                      </span>
                    </button>
                    {openSubMenus[menu.name] && (
                      <ul className="space-y-2 ml-6 mt-2">
                        {menu.subMenu.map((subMenu, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              to={subMenu.link}
                              className="block py-2 px-4 rounded-lg text-gray-300 hover:bg-blue-700 hover:text-white"
                              onClick={() => setIsOpen(false)}
                            >
                              {subMenu.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={menu.link}
                    className={`flex items-center py-3 px-4 rounded-lg transition duration-300 ${
                      location.pathname === menu.link
                        ? "bg-blue-700 text-white"
                        : "text-gray-300 hover:bg-blue-700 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-lg mr-3">{menu.icon}</span>
                    {menu.name}
                  </Link>
                )}
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
