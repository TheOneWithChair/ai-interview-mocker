"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Use images from `public/` folder
const cogImage = "/cog.png";
const cylinderImage = "/cylinder.png";
const noodleImage = "/noodle.png";
const arrowIcon = "/arrow-right.svg";

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={heroRef}
      className="pt-20 pb-32 md:pt-28 md:pb-40 px-8 md:px-24 lg:px-32 overflow-x-clip"
      style={{
        background:
          "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-16">
          {/* Left Side - Text */}
          <div className="text-center md:text-left md:w-1/2">
            <div className="tag text-indigo-600 text-lg font-semibold">
              🚀 Version 2.0 is here
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-[#001E80] mt-6 leading-tight">
              Pathway to Productivity
            </h1>
            <p className="text-xl sm:text-2xl text-gray-800 mt-6 leading-relaxed">
              Celebrate the joy of accomplishment with an AI-powered app
              designed to track your progress, boost your confidence, and
              elevate your interview performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center md:justify-start mt-10">
              <button className="px-8 py-4 text-white bg-indigo-600 rounded-lg font-semibold text-xl hover:bg-indigo-500 transition">
                Get for free
              </button>
              <button className="flex items-center gap-3 text-indigo-600 font-semibold text-xl hover:underline">
                <span>Learn more</span>
                <Image src={arrowIcon} alt="Arrow Right" width={28} height={28} />
              </button>
            </div>
          </div>

          {/* Right Side - Animated Images */}
          <div className="relative md:w-1/2 flex justify-center">
            {/* Cog Image (Bigger & Positioned Properly) */}
            <motion.div
              className="md:absolute md:h-auto w-48 sm:w-64 md:w-80 lg:w-96 md:left-10 lg:left-0"
              animate={{ translateY: [-40, 40] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
                ease: "easeInOut",
              }}
            >
              <Image src={cogImage} alt="Cog image" width={450} height={450} />
            </motion.div>

            {/* Cylinder Image - Bigger & Positioned Correctly */}
            <motion.div
              className="hidden md:block absolute -top-12 -left-40 md:w-64 lg:w-72"
              animate={{ translateY: [-30, 30] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <Image
                src={cylinderImage}
                alt="Cylinder Image"
                width={280}
                height={280}
              />
            </motion.div>

            {/* Noodle Image - Bigger & Same Position */}
            <motion.div
              className="hidden lg:block absolute top-[500px] left-[500px] rotate-[30deg] md:w-64 lg:w-72"
              animate={{ translateY: [-25, 25], rotate: [25, 35] }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 5,
                ease: "easeInOut",
              }}
            >
              <Image
                src={noodleImage}
                alt="Noodle image"
                width={280}
                height={200}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
