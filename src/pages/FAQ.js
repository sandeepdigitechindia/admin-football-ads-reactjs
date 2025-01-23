import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all our products. If you are not satisfied with your purchase, you can return it within 30 days of receipt.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach our customer support team by emailing support@example.com or by calling (123) 456-7890.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Yes, we offer international shipping to most countries. Shipping costs will vary based on your location.',
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order has been shipped, we will send you a tracking number via email. You can track your order through our website or the courier service.',
    },
    {
      question: 'Can I modify or cancel my order after placing it?',
      answer: 'Orders can be modified or canceled within 24 hours of placing them. After that, we cannot make changes to your order.',
    },
  ];

  return (
    <div className="home">
    <section className="py-16 px-4 bg-gray-50" id="faq">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-600">
          Frequently Asked Questions
        </h1>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <div
                onClick={() => toggleQuestion(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default FAQ;
