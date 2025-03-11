// "use client";

// import { useState } from "react";
// import Script from "next/script";

// const PaymentPage = () => {
//   const AMOUNT = 100;
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);

//   const handlePayment = async () => {
//     setIsProcessing(true);
//     setError("");
    
//     try {
//       if (!isScriptLoaded) {
//         throw new Error("Razorpay SDK is not loaded yet. Please try again.");
//       }
      
//       // Fixed API path - this is the key change
//       const response = await fetch('/api/razorpay', {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("API error response:", errorText);
//         throw new Error(`Server returned ${response.status}: ${errorText.substring(0, 100)}...`);
//       }
      
//       let data;
//       try {
//         data = await response.json();
//       } catch (parseError) {
//         console.error("JSON parse error:", parseError);
//         const rawText = await response.text();
//         console.error("Raw response:", rawText.substring(0, 100));
//         throw new Error("Invalid response from server");
//       }
      
//       if (!data.orderId) {
//         throw new Error("No order ID received from server");
//       }
      
//       console.log("Order created successfully:", data.orderId);
      
//       // Initialize Razorpay
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: AMOUNT * 100,
//         currency: "INR",
//         name: "Test",
//         description: "Test",
//         order_id: data.orderId,
//         handler: function(response) {
//           console.log("Payment success:", response);
//           alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
//         },
//         prefill: {
//           name: "Test",
//           email: "test@email.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#3399cc",
//         }
//       };
      
//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (e) {
//       console.error("Error in payment flow:", e);
//       setError(e.message || "Payment initialization failed");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <Script
//         src="https://checkout.razorpay.com/v1/checkout.js"
//         onLoad={() => {
//           console.log("Razorpay SDK loaded");
//           setIsScriptLoaded(true);
//         }}
//         onError={() => {
//           console.error("Failed to load Razorpay SDK");
//           setError("Failed to load payment SDK");
//         }}
//       />
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center mb-8">Payment Page</h1>
//         <p className="mb-4 text-center text-gray-700">Amount to pay: ₹{AMOUNT}</p>
        
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
//             {error}
//           </div>
//         )}
        
//         <button
//           onClick={handlePayment}
//           disabled={isProcessing || !isScriptLoaded}
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isProcessing ? "Processing..." : "Pay Now"}
//         </button>
        
//         {!isScriptLoaded && (
//           <p className="mt-2 text-sm text-gray-500 text-center">
//             Loading payment system...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

// "use client";

// import { useState } from "react";
// import Script from "next/script";

// const PaymentPage = () => {
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState("");
//   const [isScriptLoaded, setIsScriptLoaded] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const plans = [
//     {
//       name: "Enterprise",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       price: 32,
//       isMostPop: true,
//       features: [
//         "Curabitur faucibus",
//         "massa ut pretium maximus",
//         "Sed posuere nisi",
//         "Pellentesque eu nibh et neque",
//         "Suspendisse a leo",
//         "Praesent quis venenatis ipsum",
//         "Duis non diam vel tortor",
//       ],
//     },
//     {
//       name: "Startup",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       price: 12,
//       isMostPop: false,
//       features: [
//         "Curabitur faucibus",
//         "massa ut pretium maximus",
//         "Sed posuere nisi",
//         "Pellentesque eu nibh et neque",
//         "Suspendisse a leo",
//         "Praesent quis venenatis ipsum",
//         "Duis non diam vel tortor",
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
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ amount: price })
//       });
      
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("API error response:", errorText);
//         throw new Error(`Server returned ${response.status}: ${errorText.substring(0, 100)}...`);
//       }
      
//       let data;
//       try {
//         data = await response.json();
//       } catch (parseError) {
//         console.error("JSON parse error:", parseError);
//         const rawText = await response.text();
//         console.error("Raw response:", rawText.substring(0, 100));
//         throw new Error("Invalid response from server");
//       }
      
//       if (!data.orderId) {
//         throw new Error("No order ID received from server");
//       }
      
//       console.log("Order created successfully:", data.orderId);
      
//       // Initialize Razorpay
//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: price * 100, // Convert to paise
//         currency: "INR",
//         name: "Your Company",
//         description: `${selectedPlan} Plan Subscription`,
//         order_id: data.orderId,
//         handler: function(response) {
//           console.log("Payment success:", response);
//           alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
//         },
//         prefill: {
//           name: "Customer Name",
//           email: "customer@email.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#4F46E5", // Indigo color to match UI
//         }
//       };
      
//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (e) {
//       console.error("Error in payment flow:", e);
//       setError(e.message || "Payment initialization failed");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <>
//       <Script
//         src="https://checkout.razorpay.com/v1/checkout.js"
//         onLoad={() => {
//           console.log("Razorpay SDK loaded");
//           setIsScriptLoaded(true);
//         }}
//         onError={() => {
//           console.error("Failed to load Razorpay SDK");
//           setError("Failed to load payment SDK");
//         }}
//       />

//       <section className='relative py-14'>
//         <div className="absolute top-0 w-full h-[521px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
        
//         <div className="max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
//           <div className='relative max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
//             <h3 className="text-indigo-600 font-semibold">
//               Pricing
//             </h3>
//             <p className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
//               Pay as you grow
//             </p>
//             <div className='max-w-xl'>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat nunc.
//               </p>
//             </div>
            
//             {error && (
//               <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm mx-auto max-w-md">
//                 {error}
//               </div>
//             )}
            
//             {!isScriptLoaded && (
//               <p className="mt-2 text-sm text-gray-500 text-center">
//                 Loading payment system...
//               </p>
//             )}
//           </div>
          
//           <div className='mt-16 justify-center sm:flex'>
//             {plans.map((item, idx) => (
//               <div 
//                 key={idx} 
//                 className={`relative flex-1 flex items-stretch flex-col mt-6 sm:mt-0 sm:rounded-xl sm:max-w-md ${item.isMostPop ? "bg-white shadow-lg sm:border" : ""}`}
//               >
//                 <div className="p-4 py-8 space-y-4 border-b md:p-8">
//                   <span className='text-indigo-600 font-medium'>
//                     {item.name}
//                   </span>
//                   <div className='text-gray-800 text-3xl font-semibold'>
//                     ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
//                   </div>
//                   <p>
//                     {item.desc}
//                   </p>
//                   <button 
//                     className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
//                     onClick={() => {
//                       setSelectedPlan(item.name);
//                       handlePayment(item.price);
//                     }}
//                     disabled={isProcessing || !isScriptLoaded}
//                   >
//                     {isProcessing && selectedPlan === item.name ? "Processing..." : "Get Started"}
//                   </button>
//                 </div>
//                 <ul className='p-4 py-8 space-y-3 md:p-8'>
//                   <li className="pb-2 text-gray-800 font-medium">
//                     <p>Features</p>
//                   </li>
//                   {item.features.map((featureItem, idx) => (
//                     <li key={idx} className='flex items-center gap-5'>
//                       <svg
//                         xmlns='http://www.w3.org/2000/svg'
//                         className='h-5 w-5 text-indigo-600'
//                         viewBox='0 0 20 20'
//                         fill='currentColor'>
//                         <path
//                           fillRule='evenodd'
//                           d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
//                           clipRule='evenodd'></path>
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

'use client';

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

const PaymentPage = () => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: "Enterprise",
      desc: "Unlock AI-driven interview coaching and analytics for top-tier preparation.",
      price: 10,
      isMostPop: true,
      features: [
        "🚀 AI-Powered Mock Interviews",
        "🎯 Personalized Question Bank",
        "📊 AI-Generated Performance Reports",
        "🧠 Adaptive Learning Mode",
        "📹 Video & Audio Feedback",
        "💬 Real-time Chat Assistance",
        "💼 Industry-Specific Scenarios",
        "👥 Peer & Expert Reviews",
      ],
    },
    {
      name: "Free",
      desc: "Get started with basic AI interview prep, limited features included.",
      price: 0,
      isMostPop: false,
      features: [
        "🎯 AI-Powered Basic Interviews",
        "📊 Limited Performance Reports",
        "🧠 Fixed Question Set",
        "📹 Text-based Feedback Only",
        "💼 General Interview Questions",
      ],
    },
  ];

  const handlePayment = async (price) => {
    setIsProcessing(true);
    setError("");
    
    try {
      if (!isScriptLoaded) {
        throw new Error("Razorpay SDK is not loaded yet. Please try again.");
      }

      const response = await fetch('/api/razorpay', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: price })
      });

      if (!response.ok) {
        throw new Error(`Payment initialization failed. Server responded with ${response.status}`);
      }

      const data = await response.json();

      if (!data.orderId) {
        throw new Error("No order ID received from server");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: price * 100,
        currency: "INR",
        name: "IntelliMock AI",
        description: `${selectedPlan} Plan Subscription`,
        order_id: data.orderId,
        handler: function(response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@email.com",
          contact: "9999999999",
        },
        theme: { color: "#4F46E5" }
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
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setIsScriptLoaded(true)}
        onError={() => setError("Failed to load payment SDK")}
      />

      <section className='relative py-14'>
        <div className="absolute top-0 w-full h-[521px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.17) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
        
        <div className="max-w-screen-xl mx-auto text-gray-600 sm:px-4 md:px-8">
          <div className='relative max-w-xl mx-auto space-y-3 px-4 sm:text-center sm:px-0'>
            <h3 className="text-indigo-600 font-semibold">Pricing</h3>
            <p className='text-gray-800 text-3xl font-semibold sm:text-4xl'>Power Your Preparation with AI</p>
            <p>Upgrade to unlock AI-powered mock interviews, feedback, and analytics for job-winning performance.</p>
            
            {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm mx-auto max-w-md">{error}</div>}
            {!isScriptLoaded && <p className="mt-2 text-sm text-gray-500 text-center">Loading payment system...</p>}
          </div>
          
          <div className='mt-16 justify-center sm:flex'>
            {plans.map((item, idx) => (
              <div 
                key={idx} 
                className={`relative flex-1 flex items-stretch flex-col mt-6 sm:mt-0 sm:rounded-xl sm:max-w-md ${item.isMostPop ? "bg-white shadow-lg sm:border" : ""}`}
              >
                <div className="p-4 py-8 space-y-4 border-b md:p-8">
                  <span className='text-indigo-600 font-medium'>{item.name}</span>
                  <div className='text-gray-800 text-3xl font-semibold'>
                    ${item.price} <span className="text-xl text-gray-600 font-normal">/mo</span>
                  </div>
                  <p>{item.desc}</p>
                  <button 
                    className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed'
                    onClick={() => handlePayment(item.price)}
                    disabled={isProcessing || (item.name === "Enterprise" && !isScriptLoaded)}
                  >
                    {isProcessing && selectedPlan === item.name ? "Processing..." : "Get Started"}
                  </button>
                </div>
                <ul className='p-4 py-8 space-y-3 md:p-8'>
                  <li className="pb-2 text-gray-800 font-medium"><p>Key Features</p></li>
                  {item.features.map((featureItem, idx) => (
                    <li key={idx} className='flex items-center gap-5'>
                      <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-indigo-600' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd'></path>
                      </svg>
                      {featureItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PaymentPage;
