import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <section className="py-16 px-4 bg-gray-50" id="contact-us">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <div className="p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Contact Us</h2>
            <p className="text-center text-gray-600 mb-6">
              We’d love to hear from you! Get in touch with us using the form on the right or through the details below.
            </p>
            <div className="mb-6">
            <img
              src="/contact/contact-us.jpg"
              alt="About Us"
              className="w-full rounded-lg shadow-lg"
            />
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Our Contact Info</h3>
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@yourdomain.com" className="text-blue-600 hover:underline">
                  contact@yourdomain.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> <a href="tel:+123456789" className="text-blue-600 hover:underline">+1 (234) 567-890</a>
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4 justify-center">
                <a href="https://facebook.com" className="text-blue-600 hover:text-blue-700">
                  <FaFacebookF size={24} />
                </a>
                <a href="https://twitter.com" className="text-blue-400 hover:text-blue-500">
                  <FaTwitter size={24} />
                </a>
                <a href="https://linkedin.com" className="text-blue-700 hover:text-blue-800">
                  <FaLinkedinIn size={24} />
                </a>
                <a href="https://instagram.com" className="text-pink-600 hover:text-pink-700">
                  <FaInstagram size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-center mb-8">Get In Touch</h3>
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
              {/* Name Field */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Contact Field */}
              <div className="mb-6">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contact
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Subject Field */}
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter the subject"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows="5"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
