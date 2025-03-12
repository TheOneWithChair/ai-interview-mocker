"use client";
import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

// Use images from the `public/` folder
const avatars = [
  "/avatar-1.png",
  "/avatar-2.png",
  "/avatar-3.png",
  "/avatar-4.png",
  "/avatar-5.png",
  "/avatar-6.png",
  "/avatar-7.png",
  "/avatar-8.png",
  "/avatar-9.png",
];

const testimonials = [
  {
    text: "IntelliMock AI gave me real-time feedback on my technical interview answers. I felt super confident in my final interview and landed my dream job!",
    imageSrc: avatars[0],
    name: "Jamie Rivera",
    username: "@jamie_techprep",
  },
  {
    text: "The AI-driven mock interviews are a game-changer! The questions were spot-on, and the feedback helped me improve my problem-solving skills.",
    imageSrc: avatars[1],
    name: "Josh Smith",
    username: "@josh_codes",
  },
  {
    text: "I was struggling with behavioral interviews, but IntelliMock AI gave me structured responses and confidence to tackle any question!",
    imageSrc: avatars[2],
    name: "Morgan Lee",
    username: "@morgan_ai_interview",
  },
  {
    text: "The personalized question bank is incredible! It tailored the interviews based on my weaknesses, making me feel fully prepared.",
    imageSrc: avatars[3],
    name: "Casey Jordan",
    username: "@casey_dev",
  },
  {
    text: "I love the AI-generated performance reports. They highlighted my strengths and weaknesses, which made my practice much more effective.",
    imageSrc: avatars[4],
    name: "Taylor Kim",
    username: "@taylor_interslay",
  },
  {
    text: "IntelliMock AI helped me structure my answers better, and the adaptive learning mode made sure I improved with every session.",
    imageSrc: avatars[5],
    name: "Riley Smith",
    username: "@riley_crackedit",
  },
  {
    text: "From system design to DSA questions, the AI mock interviews were on point! This is the best prep tool for coding interviews.",
    imageSrc: avatars[6],
    name: "Jordan Patels",
    username: "@jordan_dsa",
  },
  {
    text: "I practiced with IntelliMock AI before my FAANG interviews. It made me feel so much more confident, and I aced my rounds!",
    imageSrc: avatars[7],
    name: "Sam Dawson",
    username: "@sam_faangprep",
  },
  {
    text: "The AI feedback was exactly what I needed to improve. My answers became more structured, and my delivery was flawless in my final interview!",
    imageSrc: avatars[8],
    name: "Casey Harper",
    username: "@casey_crackedit",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => (
  <div className={twMerge("w-full max-w-xs", className)}>
    <motion.div
      className="flex flex-col gap-6"
      animate={{ translateY: "-50%" }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
        duration: duration,
      }}
    >
      {[...Array(2)].map((_, index) => (
        <React.Fragment key={index}>
          {testimonials.map(({ text, imageSrc, name, username }, idx) => (
            <div key={idx} className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
              <p className="text-gray-700 text-lg">{text}</p>
              <div className="flex items-center gap-3 mt-5">
                <Image
                  src={imageSrc}
                  width={40}
                  height={40}
                  alt={name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{name}</span>
                  <span className="text-gray-500">{username}</span>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-24">
      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center">
          <div className="inline-block px-4 py-2 border border-indigo-500 text-indigo-600 rounded-full font-semibold text-lg">
            Testimonials
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-[#001E80] mt-6 leading-tight">What Our Users Say</h1>
          <p className="mt-4 text-lg text-gray-700">
            From AI-driven mock interviews to real-time feedback, IntelliMock AI has helped job seekers worldwide land their dream roles.
          </p>
        </div>

        <div className="mt-16 flex justify-center gap-6 max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={18} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
        </div>
      </div>
    </section>
  );
};
