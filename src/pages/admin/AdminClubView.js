import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import { Link, useParams,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../api";

const AdminClubView = () => {
  const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      club_name:"",
      club_logo:"",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        dob: "",
        country: "",
        role: "",
        password: "",
      });

      // Fetch club data from API
  useEffect(() => {
    const fetchClub = async () => {
      try {
        const response = await API.get(`/api/admin/users/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching Club data:", error);
      }
    };

    if (id) fetchClub();
  }, [id]);
  // Static data to replace `selectedRow`
  const selectedRow = {
    clubName: formData.club_name || "N/A",
    clubLogo: formData.club_logo || "/common/club.png",
    profilePic: formData.profile || "/common/man.png",
    firstName: formData.first_name,
    lastName: formData.last_name,
    email: formData.email,
    phone: formData.phone,
    country: formData.country,
    title: "Software Engineer",
    description:
      "An experienced software engineer skilled in React and Node.js.",
    salary: "100,000",
    position: "Full-Time",
    image: "/post/post.jpg",
  };

  const selectedClub = {
    id: 1,
    name: "John Doe",
    appliedJobs: [
      {
        jobId: 1,
        title: "Software Engineer",
        company: "Tech Corp",
        status: "Applied",
      },
      {
        jobId: 2,
        title: "UI/UX Designer",
        company: "Design Ltd.",
        status: "Interview",
      },
      {
        jobId: 3,
        title: "Product Manager",
        company: "Product Solutions",
        status: "Applied",
      },
    ],
  };

  const handleDeleteClub = async (userId) => {
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
          await API.delete(`/api/admin/users/${userId}`);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          navigate("/admin/clubs");
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "Failed to delete user. Try again.", "error");
        }
      }
    });
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Club and Post Details
          </h1>
          <div>
            <Link
              to={`/admin/club/edit/${id}`}
              className="py-2 px-6 mx-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              &#9998; Edit
            </Link>

            <Link
              onClick={() => handleDeleteClub(id)}
              className="py-2 px-6 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              &#10539; Delete
            </Link>
          </div>
        </header>
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow">
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* club Card */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-gray-100 p-4 flex items-center gap-4">
                  <img
                    src={selectedRow.profilePic}
                    alt="club"
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                  />
                  <h4 className="text-xl font-bold text-gray-800">
                    Club Profile
                  </h4>
                </div>
                <div className="p-4">
                  <table className="w-full text-left text-gray-700">
                    <tbody>
                    <tr>
                        <td className="font-semibold py-2">Club Name:</td>
                        <td>{selectedRow.clubName}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Club Logo:</td>
                        <td><img
                          src={selectedRow.clubLogo}
                          alt={`${selectedRow.clubName}`}
                          className="w-12 h-12 rounded-full"
                        /></td>
                      </tr>
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
                        <td className="font-semibold py-2">Country:</td>
                        <td>{selectedRow.country}</td>
                      </tr>
                      
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Post Card */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-gray-100 p-4 flex items-center gap-4">
                  <img
                    src={selectedClub.profilePic || "/common/man.png"} // Default image if no profile pic
                    alt={selectedClub.name}
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                  />
                  <h4 className="text-xl font-bold text-gray-800">
                    {selectedClub.name}
                  </h4>
                </div>

                {/* Jobs Applied by Club */}
                <div className="p-4">
                  <h5 className="text-lg font-semibold text-gray-800 mb-2">
                    Jobs Applied:
                  </h5>
                  {selectedClub.appliedJobs &&
                  selectedClub.appliedJobs.length > 0 ? (
                    <table className="w-full text-left text-gray-700">
                      <thead>
                        <tr>
                          <th className="font-semibold py-2">Job Title</th>
                          <th className="font-semibold py-2">Company</th>
                          <th className="font-semibold py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedClub.appliedJobs.map((job, index) => (
                          <tr key={index}>
                            <td className="py-2">{job.title}</td>
                            <td className="py-2">{job.company}</td>
                            <td className="py-2">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  job.status === "Applied"
                                    ? "bg-green-100 text-green-700"
                                    : job.status === "Interview"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {job.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-600">No jobs applied yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClubView;
