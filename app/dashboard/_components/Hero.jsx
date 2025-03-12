"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

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
        <>
            {/* Announcement Banner */}
            <div className="bg-black">
                <div className="max-w-screen-xl mx-auto px-4 py-5 text-white sm:text-center md:px-8">
                    <p className="font-medium">
                    Streamline your workflow and boost your productivity!{" "}
                        <a
                            href="/dashboard/howitworks"
                            className="font-semibold underline duration-150 hover:text-indigo-100 inline-flex items-center gap-x-1"
                        >
                            Learn more
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </p>
                </div>
            </div>

            {/* Hero Section */}
            <section
                ref={heroRef}
                className="pt-30 pb-32 md:pt-28 md:pb-40 px-8 md:px-24 lg:px-32 overflow-x-clip"
                style={{
                    background:
                        "radial-gradient(ellipse 200% 100% at bottom left, #183EC2, #EAEEFE 100%)",
                }}
            >
                <div className="max-w-screen-xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-16">
                        {/* Left Side - Text */}
                        <div className="text-center md:text-left md:w-1/2">
                            <div className="tag text-black text-lg font-semibold">
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
                                <Link href="/dashboard">
                                    <button className="px-8 py-4 text-white bg-black rounded-lg font-semibold text-xl hover:bg-gray-900 transition">
                                        Get for free
                                    </button>
                                </Link>
                                <Link href="/dashboard/howitworks">
                                <button className="flex items-center gap-3 text-black font-semibold text-xl hover:underline">
                                    <span>Learn more</span>
                                    <Image src={arrowIcon} alt="Arrow Right" width={28} height={28} />
                                </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Animated Images */}
                        <div className="relative md:w-1/2 flex justify-center">
                            {/* Cog Image (Moved Higher) */}
                            <motion.div
                                className="md:absolute md:h-auto w-60 sm:w-80 md:w-[550px] lg:w-[600px] md:left-[-30px] lg:left-[-50px] md:top-[-120px] lg:top-[-150px]"
                                animate={{ translateY: [-40, 40] }}
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    duration: 3,
                                    ease: "easeInOut",
                                }}
                            >
                                <Image src={cogImage} alt="Cog image" width={550} height={750} />
                            </motion.div>
                            {/* Cylinder Image (Moved to Left) */}
                            <motion.div
                                className="hidden md:block md:absolute md:h-auto w-28 sm:w-40 md:w-[200px] lg:w-[220px] md:top-[-220px] lg:top-[-250px] md:left-[-40px] lg:left-[-60px]"
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
                                    width={200}
                                    height={340}
                                />
                            </motion.div>


                            {/* Noodle Image */}
                            <motion.div
                                className="hidden lg:block absolute top-[250px] left-[400px] rotate-[30deg] md:w-56 lg:w-64"
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
                                    width={180}
                                    height={130}
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
