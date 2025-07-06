import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { amount, plan } = await request.json();

    // Return payment configuration (without exposing secret keys)
    const paymentConfig = {
      key: process.env.RAZORPAY_KEY_ID, // This will be the public key ID
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "IntelliMock AI",
      description: `${plan} Plan Subscription`,
      theme: {
        color: "#4F46E5",
      },
      prefill: {
        name: "Customer Name",
        email: "customer@email.com",
        contact: "9999999999",
      },
    };

    return NextResponse.json({
      success: true,
      config: paymentConfig,
    });
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}
