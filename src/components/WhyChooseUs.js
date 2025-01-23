import React, { useEffect, useState } from 'react';

const Counter = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [start, end, duration]);

  return <span>{count}</span>;
};

const WhyChooseUs = () => {
  return (
    <div className="bg-blue-900 py-16">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section */}
          <div className="lg:w-1/4 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl font-bold text-white mb-4">STAT</h2>
            <p className="text-2xl font-semibold text-white">Why Choose Us</p>
          </div>

          {/* Right Section */}
          <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded shadow-lg h-30">
              <h3 className="text-3xl font-bold text-gray-800">
                <Counter start={0} end={1500} duration={2000} />+
              </h3>
              <p className="text-lg text-gray-600">Happy Clients</p>
            </div>
            <div className="p-6 bg-white rounded shadow-lg h-30">
              <h3 className="text-3xl font-bold text-gray-800">
                <Counter start={0} end={25} duration={2000} />+
              </h3>
              <p className="text-lg text-gray-600">Countries</p>
            </div>
            <div className="p-6 bg-white rounded shadow-lg h-30">
              <h3 className="text-3xl font-bold text-gray-800">
                <Counter start={0} end={300} duration={2000} />+
              </h3>
              <p className="text-lg text-gray-600">Contracts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
