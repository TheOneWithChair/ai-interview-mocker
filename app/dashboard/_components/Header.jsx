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


// 'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

const Header = () => {
  const [path, setPath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    setPath(pathname); // Ensures pathname updates correctly on the client
  }, [pathname]); // ✅ Add `pathname` as a dependency

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      {/* Top banner */}
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <p className="text-white/60 md:block hidden">
          Streamline your workflow and boost your productivity
        </p>
        <div className="inline-flex gap-1 items-center">
          <p>Get started for free</p>
          <Image src="/arrow-right.svg" alt="Arrow Right" width={16} height={16} />
        </div>
      </div>

      {/* Main header */}
      <div className="py-5 bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* LOGO */}
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Image src="/logosaas.png" alt="SaaS Logo" width={40} height={40} />
              <span className="text-lg font-semibold text-gray-700">AI SaaS</span>
            </Link>

            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <Link
                href="/dashboard"
                className={`hover:text-primary hover:font-bold transition-colors
                  ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/questions"
                className={`hover:text-primary hover:font-bold transition-colors
                  ${path === '/dashboard/questions' ? 'text-primary font-bold' : ''}`}
              >
                Questions
              </Link>
              <Link
                href="/dashboard/upgrade"
                className={`hover:text-primary hover:font-bold transition-colors
                  ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}`}
              >
                Upgrade
              </Link>
              <Link
                href="/dashboard/howitworks"
                className={`hover:text-primary hover:font-bold transition-colors
                  ${path === '/dashboard/howitworks' ? 'text-primary font-bold' : ''}`}
              >
                How it works?
              </Link>
              <UserButton />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
