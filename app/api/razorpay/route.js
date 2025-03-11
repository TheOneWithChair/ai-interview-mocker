// // app/api/razorpay/route.js
// import { NextRequest, NextResponse } from "next/server";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// export async function POST(request) {
//   try {
//     const order = await razorpay.orders.create({
//       amount: 100 * 100, // amount in paise (100 INR)
//       currency: "INR",
//       receipt: "receipt_" + Math.random().toString(36).substring(7),
//     });
    
//     return NextResponse.json({ orderId: order.id }, { status: 200 });
//   } catch (e) {
//     return NextResponse.json({ message: e.message }, { status: 500 });
//   }
// }

// app/api/razorpay/route.js
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST() {
  console.log("API route called");
  try {
    // Check if Razorpay credentials exist
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay credentials missing");
      return NextResponse.json(
        { message: "Razorpay configuration is missing" },
        { status: 500 }
      );
    }
    
    // Initialize Razorpay with error handling
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
    
    // Create order with additional logging
    console.log("Creating Razorpay order");
    const order = await razorpay.orders.create({
      amount: 100 * 100, // amount in paise (100 INR)
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });
    
    console.log("Order created:", order.id);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (e) {
    console.error("Razorpay error:", e);
    return NextResponse.json(
      { message: e.message || "Something went wrong" },
      { status: 500 }
    );
  }
}