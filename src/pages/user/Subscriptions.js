import React from "react";
import Sidebar from "../../components/user/Sidebar";

const Subscriptions = () => {
  // Sample subscription data
  const subscriptions = [
    {
      plan: "Premium Plan",
      startDate: "Jan 10, 2025",
      endDate: "Jan 10, 2026",
      status: "Active",
      renewalStatus: "Auto Renew",
      benefits: ["Unlimited Access", "Premium Support", "Exclusive Content"],
      description:
        "The Premium Plan offers unlimited access to all features with priority support.",
    },
    {
      plan: "Standard Plan",
      startDate: "Nov 20, 2024",
      endDate: "Nov 20, 2025",
      status: "Expired",
      renewalStatus: "Manual Renewal",
      benefits: ["Limited Access", "Standard Support"],
      description:
        "The Standard Plan includes basic features with limited access and standard support.",
    },
    {
      plan: "Pro Plan",
      startDate: "Sept 12, 2024",
      endDate: "Sept 12, 2025",
      status: "Active",
      renewalStatus: "Auto Renew",
      benefits: ["Full Access", "Priority Support", "Exclusive Content", "Beta Features"],
      description:
        "The Pro Plan is perfect for professionals who want to access all features and get priority support.",
    },
  ];

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Subscriptions Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Subscriptions</h1>
            {/* <button className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Add New Subscription
            </button> */}
          </header>

          {/* Active Subscriptions */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Active Subscription Card */}
            {subscriptions.map((sub, index) =>
              sub.status === "Active" ? (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{sub.plan}</h3>
                  <p className="text-gray-600">Start Date: {sub.startDate}</p>
                  <p className="text-gray-600">End Date: {sub.endDate}</p>
                  <span className="px-4 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                    {sub.status}
                  </span>

                  <h4 className="text-lg font-medium text-gray-800">Plan Benefits</h4>
                  <ul className="space-y-2">
                    {sub.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-gray-600">{benefit}</li>
                    ))}
                  </ul>

                  <p className="text-gray-600">{sub.description}</p>

                  <div className="mt-4">
                    <span className="font-semibold text-gray-800">Renewal Status:</span> {sub.renewalStatus}
                  </div>
                </div>
              ) : null
            )}
          </section>

          {/* Expired Subscriptions */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Expired Subscription Card */}
            {subscriptions.map((sub, index) =>
              sub.status === "Expired" ? (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800">{sub.plan}</h3>
                  <p className="text-gray-600">Start Date: {sub.startDate}</p>
                  <p className="text-gray-600">End Date: {sub.endDate}</p>
                  <span className="px-4 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold">
                    {sub.status}
                  </span>

                  <h4 className="text-lg font-medium text-gray-800">Plan Benefits</h4>
                  <ul className="space-y-2">
                    {sub.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-gray-600">{benefit}</li>
                    ))}
                  </ul>

                  <p className="text-gray-600">{sub.description}</p>

                  <div className="mt-4">
                    <span className="font-semibold text-gray-800">Renewal Status:</span> {sub.renewalStatus}
                  </div>
                </div>
              ) : null
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Subscriptions;
