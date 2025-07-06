import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
    } = body;

    if (!mockIdRef || !question || !userAns || !userEmail) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const insertData = {
      mockIdRef,
      question,
      correctAns: correctAns || "N/A",
      userAns,
      feedback: feedback || "No feedback",
      rating: rating || "No rating",
      userEmail,
      createdAt: new Date(),
    };

    const result = await db.insert(UserAnswer).values(insertData);

    return NextResponse.json({
      success: true,
      message: "User answer recorded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error saving user answer:", error);
    return NextResponse.json(
      { error: "Failed to save user answer" },
      { status: 500 }
    );
  }
}
