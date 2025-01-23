import React from "react";
const TermsOfService = () => {
  return (
    <div className="home">
      
      <div className="container mx-auto py-16 px-4">

        <div className="prose prose-lg text-gray-700">
          <h2>1. Introduction</h2>
          <p>These are the terms of service for using our platform...</p>

          <h2>2. User Responsibilities</h2>
          <p>As a user, you agree to...</p>

          {/* Add more sections of your Terms of Service here */}

          <h2>3. Privacy Policy</h2>
          <p>We value your privacy and protect your personal data...</p>
        </div>
      </div>
    </div>
  );
};
export default TermsOfService;
