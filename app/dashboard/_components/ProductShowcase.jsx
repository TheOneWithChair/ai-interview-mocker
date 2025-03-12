"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Use images from the `public/` folder
const productImage = "/product-image.png";
const pyramidImage = "/pyramid.png";
const tubeImage = "/tube.png";

export const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#d2dcff] py-32 overflow-x-clip"
    >
      <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center">
        <div className="tag text-black text-lg font-semibold border border-indigo-600 px-4 py-2 rounded-full inline-block">
  🚀 Elevate Your Interviews
</div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-[#001E80] mt-6 leading-tight">
          The Ultimate AI-Powered Interview Prep
                            </h1>
          <p className="section-description mt-5 text-lg text-gray-700 max-w-3xl mx-auto">
            IntelliMockAI helps job seekers enhance their interview skills with real-time AI feedback, interactive mock interviews, and personalized improvement plans.  
            Stay ahead in your career by mastering technical & behavioral questions, coding challenges, and industry-specific case studies — all in one platform.
          </p>
        </div>

        {/* Product Showcase Images */}
        <div className="relative flex justify-center mt-16">
          <Image 
            src={productImage} 
            alt="IntelliMockAI Platform" 
            width={900} 
            height={600} 
            className="rounded-lg shadow-lg"
          />

          {/* Pyramid Animation */}
          <motion.div
            className="hidden md:block absolute -right-28 -top-32"
            animate={{ translateY: [-20, 20] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <Image src={pyramidImage} alt="Pyramid image" width={250} height={250} />
          </motion.div>

          {/* Tube Animation */}
          <motion.div
            className="hidden md:block absolute bottom-20 -left-28"
            animate={{ translateY: [-20, 20] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 3,
              ease: "easeInOut",
            }}
          >
            <Image src={tubeImage} alt="Tube image" width={250} height={250} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
