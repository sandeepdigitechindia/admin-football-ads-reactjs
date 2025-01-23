import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 px-4 bg-gray-50" id="about-us">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">About Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div>
            <img
              src="/about/about-us.jpg"
              alt="About Us"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          {/* Content Section */}
          <div>
            <p className="text-lg text-gray-700 mb-6">
              Welcome to Football Ads, the ultimate platform for football enthusiasts, clubs,
              and advertisers. We are dedicated to bridging the gap between fans, businesses, and
              the beautiful game of football. Our mission is to provide premium ad services, 
              subscription plans, and tools to promote your content effectively.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With a focus on innovation and user satisfaction, we help clubs and advertisers
              reach their target audience while ensuring fans stay connected with their favorite sport.
            </p>
            {/* <a
              href="/about"
              className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium transition"
            >
              Learn More About Us
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
