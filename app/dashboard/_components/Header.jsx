// import React from 'react'
// import Image from 'next/image'

// function Header() {
//   return (
//     <div>
//      <Image src={'/logo.svg'} width={60} height={50} alt='log'/>
//     </div>
//   )
// }

// export default Header
'use client';

// import React from 'react';
// import Image from 'next/image';
// import ArrowRight from '@/public/arrow-right.svg';
// import Logo from '@/public/logosaas.png';
// import MenuIcon from '@/public/menu.svg';
// import { UserButton } from '@clerk/nextjs';
// import { usePathname } from 'next/navigation'
// import { Client } from '@clerk/nextjs/server';


// const pathname = usePathname()

// const Header = () => {
//   return (
//     <header className="sticky top-0 backdrop-blur-sm z-20">
//       {/* Top banner */}
//       <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
//         <p className="text-white/60 md:block hidden">
//           Streamline your workflow and boost your productivity
//         </p>
//         <div className="inline-flex gap-1 items-center">
//           <p>Get started for free</p>  
//            <Image src={ArrowRight} alt="Arrow Right" width={16} height={16} />

//         </div>
//       </div>

//       {/* Main header */}
//       <div className="py-5 bg-white shadow-sm">
//     <div className="container mx-auto px-6">
//       <div className="flex items-center justify-between">
//         {/* LOGO - Center it using flex */}
//         <div className="flex items-center space-x-2">
//           <Image src="/logosaas.png" alt="SaaS Logo" height={40} width={40} />
//           <span className="text-lg font-semibold text-gray-700">AI SaaS</span>
//         </div>
//             <nav className="hidden md:flex gap-6 text-black/60 items-center">
//               <a className="hover:text-primary hover:font-bold" href="#">DashBoard</a>
//               <a className="hover:text-primary hover:font-bold" href="#">Questions</a>
//               <a className="hover:text-primary hover:font-bold" href="#">Upgrade</a>
//               <a className="hover:text-primary hover:font-bold" href="#">How it works</a>
//               {/* <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center tracking-tight">
//                 Get for free
//               </button> */}
//               <UserButton/>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const Header = () => {
  const [path, setPath] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const pathname = usePathname();

  useEffect(() => {
    setPath(pathname); // Ensures pathname updates correctly on the client
  }, [pathname]);

  return (
    <header className="sticky top-0 z-20 bg-white shadow-sm">
      {/* Top banner */}
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 hover:text-white transition duration-200 cursor-pointer">
          Streamline your workflow and boost your productivity
        </p>
        <Link href="/dashboard/howitworks" className="md:block hidden">
          <div className="inline-flex gap-1 items-center">
            <p>Get started for free</p>
            <Image src="/arrow-right.svg" alt="Arrow Right" width={16} height={16} />
          </div>
        </Link>
      </div>

      {/* Main header */}
      <div className="py-5 px-6 flex justify-between items-center container mx-auto">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/favicon.ico" alt="SaaS Logo" width={40} height={40} />
          <span className="text-lg font-semibold text-gray-700">IntelliMockAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-black/60 items-center">
          <NavLink href="/dashboard" path={path} label="Dashboard" />
          <NavLink href="/dashboard/faq" path={path} label="Questions" />
          <NavLink href="/dashboard/upgrade" path={path} label="Upgrade" />
          <NavLink href="/dashboard/howitworks" path={path} label="How it works?" />
          <UserButton />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Sidebar Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-40 flex flex-col p-6"
            >
              {/* Close Button */}
              <button className="self-end mb-6" onClick={() => setIsOpen(false)}>
                <X size={28} />
              </button>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-6 text-black/70">
                <NavLink href="/dashboard" path={path} label="Dashboard" isMobile setIsOpen={setIsOpen} />
                <NavLink href="/dashboard/faq" path={path} label="Questions" isMobile setIsOpen={setIsOpen} />
                <NavLink href="/dashboard/upgrade" path={path} label="Upgrade" isMobile setIsOpen={setIsOpen} />
                <NavLink href="/dashboard/howitworks" path={path} label="How it works?" isMobile setIsOpen={setIsOpen} />
                <UserButton />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

// Reusable NavLink Component
const NavLink = ({ href, path, label, isMobile, setIsOpen }) => (
  <Link
    href={href}
    className={`hover:text-primary hover:font-bold transition-colors ${
      path === href ? "text-primary font-bold" : ""
    }`}
    onClick={() => isMobile && setIsOpen(false)}
  >
    {label}
  </Link>
);

export default Header;
