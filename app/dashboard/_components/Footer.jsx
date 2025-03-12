"use client";
import Image from "next/image";

// Use images from the `public/` folder
const logo = "/logosaas.png";
const socialIcons = {
  x: "/social-x.svg",
  insta: "/social-insta.svg",
  linkedin: "/social-linkedin.svg",
  pin: "/social-pin.svg",
  youtube: "/social-youtube.svg",
};

export const Footer = () => {
  return (
    <footer className="bg-black text-[#bcbcbc] text-sm py-10 text-center">
      <div className="container mx-auto px-6">
        {/* Logo */}
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:blur before:w-full before:bg-[linear-gradient(to_right,#f87bff,#fb92cf,#ffdd9b,#c2f0b1,#2fd8fe)] before:absolute">
         
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row gap-6 mt-6 md:justify-center">
          <a href="/dashboard/howitworks" className="hover:text-white transition">About</a>
          <a href="/dashboard/howitworks" className="hover:text-white transition">Features</a>
          <a href="/" className="hover:text-white transition">Customers</a>
          <a href="/dashboard/upgrade" className="hover:text-white transition">Pricing</a>
          <a href="/dashboard/FAQ" className="hover:text-white transition">Help</a>
          
        </nav>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6">
          {Object.values(socialIcons).map((icon, index) => (
            <Image key={index} src={icon} alt="Social icon" width={24} height={24} className="hover:opacity-80 transition" />
          ))}
        </div>

        {/* Copyright */}
        <p className="mt-6">&copy; 2025 IntelliMock AI, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
