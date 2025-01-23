import React from "react";
import Sidebar from "../../components/club/Sidebar";

const ClubPostApplicantView = () => {
  // Static data to replace `selectedRow`
  const selectedRow = {
    profilePic: "/common/man.png",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    dob: "1990-01-01",
    country: "USA",
    cv: "https://example.com/johndoe-cv.pdf",
    title: "Software Engineer",
    description:
      "An experienced software engineer skilled in React and Node.js.",
    salary: "100,000",
    position: "Full-Time",
    image: "/post/post.jpg",
    companyName: "Tech Corp",
    companyLogo: "/common/club.png",
    companyDescription:
      "A leading tech company specializing in innovative solutions.",
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            User and Post Details
          </h1>
        </header>
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-100 p-4 flex items-center gap-4">
                  <img
                    src={selectedRow.profilePic}
                    alt="User"
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                  />
                  <h4 className="text-xl font-bold text-gray-800">
                    User Profile
                  </h4>
                </div>
                <div className="p-4">
                  <table className="w-full text-left text-gray-700">
                    <tbody>
                      <tr>
                        <td className="font-semibold py-2">First Name:</td>
                        <td>{selectedRow.firstName}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Last Name:</td>
                        <td>{selectedRow.lastName}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Email:</td>
                        <td>{selectedRow.email}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Phone:</td>
                        <td>{selectedRow.phone}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Date of Birth:</td>
                        <td>{selectedRow.dob}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Country:</td>
                        <td>{selectedRow.country}</td>
                      </tr>
                      {selectedRow.cv && (
                        <tr>
                          <td className="font-semibold py-2">CV:</td>
                          <td>
                            <a
                              href={selectedRow.cv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View CV
                            </a>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Post Card */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-100 p-4 flex items-center gap-4">
                  <img
                    src={selectedRow.image}
                    alt="Post"
                    className="w-16 h-16 rounded-lg border border-gray-300 shadow-sm"
                  />
                  <h4 className="text-xl font-bold text-gray-800">
                    Post Details
                  </h4>
                </div>
                <div className="p-4">
                  <table className="w-full text-left text-gray-700">
                    <tbody>
                      <tr>
                        <td className="font-semibold py-2">Title:</td>
                        <td>{selectedRow.title}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Description:</td>
                        <td>{selectedRow.description}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Salary:</td>
                        <td>${selectedRow.salary}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Position:</td>
                        <td>{selectedRow.position}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Company Details Card */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
            <div className="bg-gray-100 p-4 flex items-center gap-4">
              <img
                src={selectedRow.companyLogo}
                alt="Company Logo"
                className="w-16 h-16 rounded-lg border border-gray-300 shadow-sm"
              />
              <h4 className="text-xl font-bold text-gray-800">
                Company Details
              </h4>
            </div>
            <div className="p-4">
              <table className="w-full text-left text-gray-700">
                <tbody>
                  <tr>
                    <td className="font-semibold py-2">Name:</td>
                    <td>{selectedRow.companyName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-2">Description:</td>
                    <td>{selectedRow.companyDescription}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubPostApplicantView;
