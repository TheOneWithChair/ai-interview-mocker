"use client";

import React from "react";

// AI Interview Features
const features = [
  {
    icon: "🚀",
    title: "AI-Powered Mock Interviews",
    desc: "Simulate real interview scenarios with AI-driven question generation and instant feedback.",
  },
  {
    icon: "🎯",
    title: "Personalized Question Bank",
    desc: "Get tailored questions based on your experience, industry, and role preferences.",
  },
  {
    icon: "📊",
    title: "AI-Generated Performance Reports",
    desc: "Receive real-time analysis of your answers, confidence level, and speaking pace.",
  },
  {
    icon: "🧠",
    title: "Adaptive Learning Mode",
    desc: "AI adjusts difficulty levels based on your performance, ensuring steady improvement.",
  },
  {
    icon: "📹",
    title: "Video & Audio Feedback",
    desc: "Get AI-powered analysis of your facial expressions, voice modulation, and delivery.",
  },
  {
    icon: "💬",
    title: "Real-time Chat Assistance",
    desc: "Ask questions and get AI-generated explanations for interview-related queries.",
  },
];

export default function HowItWorksPage() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 text-gray-600">
        {/* Title Section */}
        <div className="relative max-w-2xl mx-auto text-center">
          <h3 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-[#001E80]">
            How It Works
          </h3>
          <p className="mt-4 text-lg text-gray-700">
            Elevate your interview skills with AI-driven insights and real-time feedback.
          </p>
        </div>

        {/* Features Grid */}
        <div className="relative mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li key={idx} className="bg-white space-y-3 p-6 border rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="text-4xl">{item.icon}</div>
                <h4 className="text-xl font-semibold text-gray-800">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
