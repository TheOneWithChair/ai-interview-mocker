"use client";

import React from "react";

// FAQ data (Updated for AI Interview context)
const faqsList = [
  {
    q: "How does the AI mock interview work?",
    a: "Our AI-powered system simulates real interview scenarios, analyzing your responses in real-time to provide constructive feedback on your communication skills, confidence, and delivery.",
  },
  {
    q: "Do I need a webcam and microphone?",
    a: "Yes, enabling your webcam and microphone allows the AI to analyze your expressions and voice tone. However, you can disable them at any time during the session.",
  },
  {
    q: "Is my data stored or recorded?",
    a: "No, we respect your privacy. Your interviews are not recorded or stored. Only AI-generated feedback is saved for your reference.",
  },
  {
    q: "Can I select the type of interview questions?",
    a: "Absolutely! You can choose from various categories such as Technical, HR, Behavioral, and Industry-Specific interviews.",
  },
  {
    q: "Is this platform suitable for beginners?",
    a: "Yes! Our AI adjusts to your experience level, providing beginner-friendly as well as advanced interview questions.",
  },
  {
    q: "How can I review my past interview feedback?",
    a: "Your AI-generated feedback is saved in your dashboard, where you can access performance reports, improvement tips, and question breakdowns.",
  },
];

export const FAQ = () => {
  return (
    <div className="leading-relaxed mt-12 mx-4 md:mx-8">
      {/* Title Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-[#001E80]">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Can't find the answer you're looking for? Feel free to contact us.
        </p>
      </div>

      {/* FAQ Section */}
      <div
        className="relative bg-white rounded-lg mt-10 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl sm:mx-auto p-8 shadow-lg"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {faqsList.map((item, idx) => (
            <div className="space-y-3" key={idx}>
              <h4 className="text-gray-800 text-xl font-semibold">
                {item.q}
              </h4>
              <p className="text-gray-500">{item.a}</p>
            </div>
          ))}
        </div>
        <span className="w-0.5 h-full bg-gray-200 m-auto absolute top-0 left-0 right-0 hidden md:block"></span>
      </div>
    </div>
  );
};

export default FAQ;
