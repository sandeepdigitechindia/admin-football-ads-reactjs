import React from "react";

const AdsSection = () => {
  const adsData = [
    {
      photo: "/ads/ads1.jpg",
      title: "Top Football Club Seeking New Players",
      description:
        "Our club is looking for talented football players for the upcoming season. Apply today!",
      link: "/ads/1",
    },
    {
      photo: "/ads/ads2.jpg",
      title: "Professional Coaches Available for Hire",
      description:
        "Experienced football coaches ready to take your game to the next level. Book now!",
      link: "/ads/2",
    },
    {
      photo: "/ads/ads3.jpg",
      title: "Join the Best Football Agency",
      description:
        "Get represented by one of the top football agencies. Make your mark in the industry.",
      link: "/ads/3",
    },
    {
      photo: "/ads/ads1.jpg",
      title: "Top Football Club Seeking New Players",
      description:
        "Our club is looking for talented football players for the upcoming season. Apply today!",
      link: "/ads/4",
    },
    {
      photo: "/ads/ads2.jpg",
      title: "Professional Coaches Available for Hire",
      description:
        "Experienced football coaches ready to take your game to the next level. Book now!",
      link: "/ads/5",
    },
    {
      photo: "/ads/ads3.jpg",
      title: "Join the Best Football Agency",
      description:
        "Get represented by one of the top football agencies. Make your mark in the industry.",
      link: "/ads/6",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Recent Ads</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {adsData.map((ad, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={ad.photo}
                  alt={ad.title}
                  className="object-cover h-40 w-auto md:h-48 lg:h-56"
                />
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {ad.title}
              </h3>
              <p className="text-gray-600 mb-4">{ad.description}</p>
              <a href={ad.link} className="text-blue-600 hover:underline">
                See More
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <a
            href="/ads"
            className="inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
          >
            See All Ads
          </a>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          <span>Want full access to all ads? </span>
          <a href="/subscribe" className="text-blue-600 hover:underline">
            Subscribe Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdsSection;
