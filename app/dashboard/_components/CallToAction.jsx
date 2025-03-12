"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
// Use images from the `public/` folder
const arrowIcon = "/arrow-right.svg";
const starImage = "/star.png";
const springImage = "/spring.png";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-white to-[#d2dcff] py-24 overflow-x-clip">
      <div className="container flex flex-col items-center justify-center text-center mx-auto px-6">
        <div className="relative max-w-3xl">
          <h2 className="text-5xl sm:text-6xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-[#001E80] mt-6 leading-tight">
            Sign up for Free Today
          </h2>
          <p className="mt-5 text-lg text-gray-700 max-w-2xl mx-auto">
            Celebrate the joy of accomplishment with an AI-powered app designed to track your progress and boost your confidence.
          </p>

          {/* Star Image (Moved Slightly Left) */}
          <motion.div
            className="absolute -left-[350px] -top-[90px] hidden md:block"
            animate={{ translateY: [-20, 20] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <Image src={starImage} alt="Star Image" width={350} height={350} />
          </motion.div>

          {/* Spring Image (Moved Slightly Right) */}
          <motion.div
            className="absolute -right-[300px] -top-[20px] hidden md:block"
            animate={{ translateY: [-20, 20] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <Image src={springImage} alt="Spring Image" width={350} height={350} />
          </motion.div>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex gap-4 mt-10">
        <Link href="/dashboard">
            <button className="px-6 py-3 text-white bg-black rounded-lg font-semibold text-lg hover:bg-indigo-500 transition">
              Get for free
            </button>
          </Link>
          <Link href="/dashboard/howitworks">
          <button className="py-3 flex items-center gap-2 text-indigo-600 font-semibold text-lg hover:underline">
            <span>Learn more</span>
            <Image src={arrowIcon} alt="Arrow Right" width={20} height={20} />
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
