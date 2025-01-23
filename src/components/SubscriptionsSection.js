import React from "react";
import { Link } from "react-router-dom";

const SubscriptionPlans = () => {
  const plans = [
    {
      title: "3-Month Plan",
      description: "Access basic features for 3 months.",
      price: "$19.99",
      features: [
        { title: "View ads", status: true },
        { title: "Unlimited contact access", status: true },
        { title: "Priority support", status: false },
        { title: "Ad analytics", status: false },
        { title: "Dedicated account manager", status: false },
      ],
      link: "/subscriptions/3-month",
    },
    {
      title: "6-Month Plan",
      description: "Unlock additional features for 6 months.",
      price: "$34.99",
      features: [
        { title: "View ads", status: true },
        { title: "Unlimited contact access", status: true },
        { title: "Priority support", status: true },
        { title: "Ad analytics", status: false },
        { title: "Dedicated account manager", status: false },
      ],
      link: "/subscriptions/6-month",
    },
    {
      title: "9-Month Plan",
      description: "Premium access and features for 9 months.",
      price: "$49.99",
      features: [
        { title: "View ads", status: true },
        { title: "Unlimited contact access", status: true },
        { title: "Priority support", status: true },
        { title: "Ad analytics", status: true },
        { title: "Dedicated account manager", status: false },
      ],
      link: "/subscriptions/9-month",
    },
    {
      title: "1-Year Plan",
      description: "Get full access to all features for a year.",
      price: "$59.99",
      features: [
        { title: "View ads", status: true },
        { title: "Unlimited contact access", status: true },
        { title: "Priority support", status: true },
        { title: "Ad analytics", status: true },
        { title: "Dedicated account manager", status: true },
      ],
      link: "/subscriptions/1-year",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Our Subscription Plans
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
            key={index}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden p-6 border transform transition duration-300 
            hover:scale-105 hover:border-blue-600 group"
          >
            {/* Plan Title */}
            <h3
              className="text-xl py-2 rounded-lg font-semibold mb-4 text-center transition duration-300 
              bg-gray-100 text-black group-hover:bg-blue-600 group-hover:text-white"
            >
              {plan.title}
            </h3>
          
            {/* Price */}
            <div
              className="text-2xl font-bold mb-6 text-center transition duration-300 
              text-gray-800 group-hover:text-blue-600"
            >
              {plan.price}
              <span className="text-sm text-gray-500 ml-2">/ month</span>
            </div>
          
            {/* Features List */}
            <ul className="text-gray-600 text-left mb-6 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span
                    className={`${
                      feature.status ? "text-green-500" : "text-red-500"
                    } font-bold`}
                  >
                    {feature.status ? "✔" : "✘"}
                  </span>
                  {feature.title}
                </li>
              ))}
            </ul>
          
            <Link
              to={plan.link}
              className="block text-center py-2 px-4 rounded-md text-white font-medium transition duration-300 
              bg-gray-600 group-hover:bg-blue-600 group-hover:text-white"
            >
              Buy Now
            </Link>
          
            {/* Payment Image */}
            <img
              src="/about/payment.png"
              alt="Payment"
              className="mt-4 rounded-lg w-full object-cover"
            />
          </div>
          
          ))}
        </div>

        {/* Full Access Link */}
        <div className="mt-8">
          <Link
            to="/subscriptions"
            className="text-lg font-semibold text-green-600 hover:underline"
          >
            See All Plans - Subscribe Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
