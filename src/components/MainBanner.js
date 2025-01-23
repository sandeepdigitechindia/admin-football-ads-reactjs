import React from 'react';
import { Link } from 'react-router-dom';
const MainBanner = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
        {/* Captivating Video */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video autoPlay loop muted className="w-full h-full object-cover">
            <source src="/promo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Welcome Text and CTA */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-shadow">Welcome to DB10</h1>
          <p className="text-lg sm:text-2xl mb-8 text-shadow">Your favorite site for the best football ads!</p>
          <div className="flex justify-center gap-4">
            <Link to="/subscriptions" className="cta-btn px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300">Subscribe Now</Link>
            <Link to="/about" className="cta-btn px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">Learn More</Link>
          </div>
        </div>
      </section>
  );
};

export default MainBanner;
