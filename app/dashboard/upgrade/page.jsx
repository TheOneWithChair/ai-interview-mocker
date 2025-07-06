// 'use client';

// import { useState } from "react";
// import Script from "next/script";
// import { useRouter } from "next/navigation";

// const PaymentPage = () => {
//   const router = useRouter();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const plans = [
//     {
//       name: "Enterprise",
//       desc: "Unlock AI-driven interview coaching and analytics for top-tier preparation.",
//       price: 10,
//       isMostPop: true,
//       features: [
//         "🚀 AI-Powered Mock Interviews",
//         "🎯 Personalized Question Bank",
//         "📊 AI-Generated Performance Reports",
//         "🧠 Adaptive Learning Mode",
//         "📹 Video & Audio Feedback",
//         "💬 Real-time Chat Assistance",
//         "💼 Industry-Specific Scenarios",
//         "👥 Peer & Expert Reviews",
//       ],
//     },
//     {
//       name: "Free",
//       desc: "Get started with basic AI interview prep, limited features included.",
//       price: 0,
//       isMostPop: false,
//       features: [
//         "🎯 AI-Powered Basic Interviews",
//         "📊 Limited Performance Reports",
//         "🧠 Fixed Question Set",
//         "📹 Text-based Feedback Only",
//         "💼 General Interview Questions",
//       ],
//     },
//   ];

//   const handlePayment = async (price) => {
//     setIsProcessing(true);
//     setError("");

//     try {
//       if (!isScriptLoaded) {
//         throw new Error("Razorpay SDK is not loaded yet. Please try again.");
//       }

//       const response = await fetch('/api/razorpay', {
//         method: "POST",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ amount: price })
//       });

//       if (!response.ok) {
//         throw new Error(`Payment initialization failed. Server responded with ${response.status}`);
//       }

// Payment processing moved to server-side API for better security
//         },
//         theme: { color: "#4F46E5" }
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (e) {
//       setError(e.message || "Payment initialization failed");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <>
//       <Script
//         src="https://checkout.razorpay.com/v1/checkout.js"
//         onLoad={() => setIsScriptLoaded(true)}
//         onError={() => setError("Failed to load payment SDK")}
//       />

//       <section className='relative py-14'>
//         <div className="absolute top-0 w-full h-[521px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>

//         <div className="max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
//           <div className='relative max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
//             <h3 className="text-indigo-600 font-semibold">Pricing</h3>
//             <p className='text-gray-800 text-3xl font-semibold sm:text-4xl'>Power Your Preparation with AI</p>
//             <p>Upgrade to unlock AI-powered mock interviews, feedback, and analytics for job-winning performance.</p>

//             {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm mx-auto max-w-md">{error}</div>}
//             {!isScriptLoaded && <p className="mt-2 text-sm text-gray-500 text-center">Loading payment system...</p>}
//           </div>

//           <div className='mt-16 justify-center sm:flex'>
//             {plans.map((item, idx) => (
//               <div
//                 key={idx}
//                 className={`relative flex-1 flex items-stretch flex-col mt-6 sm:mt-0 sm:rounded-xl sm:max-w-md ${item.isMostPop ? "bg-white shadow-lg sm:border" : ""}`}
//               >
//                 <div className="p-4 py-8 space-y-4 border-b md:p-8">
//                   <span className='text-indigo-600 font-medium'>{item.name}</span>
//                   <div className='text-gray-800 text-3xl font-semibold'>
//                     ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
//                   </div>
//                   <p>{item.desc}</p>
//                   <button
//                     className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
//                     onClick={() => handlePayment(item.price)}
//                     disabled={isProcessing || (item.name === "Enterprise" && !isScriptLoaded)}
//                   >
//                     {isProcessing && selectedPlan === item.name ? "Processing..." : "Get Started"}
//                   </button>
//                 </div>
//                 <ul className='p-4 py-8 space-y-3 md:p-8'>
//                   <li className="pb-2 text-gray-800 font-medium"><p>Key Features</p></li>
//                   {item.features.map((featureItem, idx) => (
//                     <li key={idx} className='flex items-center gap-5'>
//                       <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-indigo-600' viewBox='0 0 20 20' fill='currentColor'>
//                         <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'></path>
//                       </svg>
//                       {featureItem}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default PaymentPage;

"use client";
import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

// Use images from the `public/` folder
const checkIcon = "/check.svg";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get Started for Free",
    popular: false,
    inverse: false,
    features: [
      "🚀 AI-Powered Basic Interviews",
      "📊 Limited Performance Reports",
      "🧠 Fixed Question Set",
      "📹 Text-based Feedback Only",
      "💼 General Interview Questions",
    ],
    redirect: "/dashboard", // Redirect path for Free plan
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Upgrade Now",
    popular: true,
    inverse: true,
    features: [
      "🚀 AI-Powered Mock Interviews",
      "🎯 Personalized Question Bank",
      "📊 AI-Generated Performance Reports",
      "🧠 Adaptive Learning Mode",
      "📹 Video & Audio Feedback",
      "💬 Real-time Chat Assistance",
    ],
  },
];

export default function PricingPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const router = useRouter();

  const handlePayment = async (price) => {
    setIsProcessing(true);
    setError("");

    try {
      if (!isScriptLoaded) {
        throw new Error("Razorpay SDK is not loaded yet. Please try again.");
      }

      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: price }),
      });

      if (!response.ok) {
        throw new Error(
          `Payment initialization failed. Server responded with ${response.status}`
        );
      }

      const data = await response.json();
      if (!data.orderId) {
        throw new Error("No order ID received from server");
      }

      // Get payment configuration from server-side API
      const paymentResponse = await fetch("/api/payment/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: price,
          plan: selectedPlan,
        }),
      });

      const paymentData = await paymentResponse.json();
      if (!paymentData.success) {
        throw new Error("Failed to initialize payment");
      }

      const options = {
        ...paymentData.config,
        order_id: data.orderId,
        handler: function (response) {
          alert(
            "Payment successful! Payment ID: " + response.razorpay_payment_id
          );
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (e) {
      setError(e.message || "Payment initialization failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsScriptLoaded(true)}
        onError={() => setError("Failed to load payment SDK")}
      />

      {/* Pricing Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-[#001E80] mt-6 leading-tight">
              Pricing
            </h1>
            <p className="mt-5 text-lg text-gray-700">
              Free forever, upgrade for AI-driven interview coaching, analytics,
              and exclusive features.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="flex gap-6 items-center flex-col mt-10 lg:flex-row lg:justify-center lg:items-end">
            {pricingTiers.map(
              (
                {
                  title,
                  monthlyPrice,
                  buttonText,
                  popular,
                  inverse,
                  features,
                  redirect,
                },
                index
              ) => (
                <div
                  key={index}
                  className={twMerge(
                    "card p-8 rounded-lg shadow-md",
                    inverse && "border-black bg-black text-white"
                  )}
                >
                  <div className="flex justify-between items-center">
                    <h3
                      className={twMerge(
                        "text-lg font-bold text-black/50",
                        inverse && "text-white/60"
                      )}
                    >
                      {title}
                    </h3>
                    {popular && (
                      <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                        <motion.span
                          animate={{ backgroundPositionX: "100%" }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                          }}
                          className="text-transparent bg-clip-text bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%]"
                        >
                          Popular
                        </motion.span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-4xl font-bold tracking-tighter leading-none">
                      ${monthlyPrice}
                    </span>
                    <span className="tracking-tight font-bold text-black/50">
                      /month
                    </span>
                  </div>

                  {/* Button: Free → Dashboard | Pro → Razorpay */}
                  <button
                    className={twMerge(
                      "w-full mt-[30px] py-3 px-5 rounded-lg font-semibold text-lg",
                      title === "Free"
                        ? "border-2 border-gray-900 text-gray-900 hover:border-gray-700 hover:text-gray-700"
                        : "btn btn-primary",
                      inverse && "bg-white text-black"
                    )}
                    onClick={() =>
                      title === "Pro"
                        ? handlePayment(monthlyPrice)
                        : router.push("/dashboard")
                    }
                    disabled={
                      isProcessing || (title === "Pro" && !isScriptLoaded)
                    }
                  >
                    {isProcessing && title === "Pro"
                      ? "Processing..."
                      : buttonText}
                  </button>

                  {/* Features List */}
                  <ul className="flex flex-col gap-5 mt-8">
                    {features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-sm flex items-center gap-4"
                      >
                        <img src={checkIcon} alt="Check" className="w-6 h-6" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center max-w-lg mx-auto">
              {error}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
