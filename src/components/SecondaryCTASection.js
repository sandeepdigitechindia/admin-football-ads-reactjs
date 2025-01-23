import React from "react";

const SecondaryCTASection = () => {
  return (
    <section className="bg-gray-800 text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Stay Connected!</h2>

        <div className="flex flex-col lg:flex-row w-full items-center">
          {/* Left Side - Image and Text */}
          <div className="w-full lg:w-1/2 ">
            {/* Newsletter Subscription */}
            <div className="mb-8">
              <p className="text-xl mb-4">
                Subscribe to our newsletter for updates and exclusive
                promotions!
              </p>
              <form className="flex justify-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 text-black rounded-l-lg w-1/2"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-r-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center gap-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/social/facebook.png"
                  alt="Facebook"
                  className="w-8 h-8 hover:text-blue-600 transition-colors"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/social/twitter.png"
                  alt="Twitter"
                  className="w-8 h-8 hover:text-blue-400 transition-colors"
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/social/instagram.png"
                  alt="Instagram"
                  className="w-8 h-8 hover:text-pink-600 transition-colors"
                />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/social/linkedin.png"
                  alt="LinkedIn"
                  className="w-8 h-8 hover:text-blue-700 transition-colors"
                />
              </a>
            </div>
          </div>
          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2">
            <img
              src="/about/login.jpg" // Replace with your image path
              alt="Login Illustration"
              className="mt-4 rounded-lg w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondaryCTASection;
