import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (pathnames.length === 0) {
    return null;
  }

  // Get the last part of the URL for the page heading
  const pageHeading = pathnames[pathnames.length - 1]
    .replace(/-/g, " ")
    .toUpperCase();

  return (
    <section
      className="relative bg-cover bg-center py-16"
      style={{
        backgroundImage: 'url("/about/bg.jpg")', // Add the path to your image
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Optional dark overlay */}
      <div className="container mx-auto relative text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          {pageHeading}
        </h1>

        <nav className="bg-gray-100 inline-block py-2 px-4 rounded-md text-sm shadow-md">
          <ol className="flex justify-center space-x-2 text-gray-600">
            <li>
              <Link to="/" className="text-blue-600 hover:underline">
                Home
              </Link>
              <span className="mx-1">/</span>
            </li>
            {pathnames.map((value, index) => {
              const isLast = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join("/")}`;

              return isLast ? (
                <li key={to} className="text-gray-800 font-semibold">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </li>
              ) : (
                <li key={to}>
                  <Link to={to} className="text-blue-600 hover:underline">
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </Link>
                  <span className="mx-1">/</span>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumbs;
