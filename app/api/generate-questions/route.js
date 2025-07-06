import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { jobPosition, jobDescription, jobExperience, questionCount } =
      await request.json();

    if (!jobPosition || !jobDescription || !jobExperience) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${
      questionCount || 5
    } Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
    {
      "question": "Your question here",
      "answer": "Your answer here"
    }`;

    const result = await model.generateContent(inputPrompt);
    const responseText = await result.response.text();

    // Remove markdown code blocks if present
    let cleanedText = responseText.replace(/```json|```/g, "").trim();

    // Try to find valid JSON array in the response
    const jsonMatch = cleanedText.match(/\[\s*\{[\s\S]*\}\s*\]/s);
    if (!jsonMatch) {
      throw new Error("No valid JSON array found in the response");
    }

    const jsonResponsePart = jsonMatch[0];
    const mockResponse = JSON.parse(jsonResponsePart.trim());

    return NextResponse.json({
      success: true,
      questions: mockResponse,
    });
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      { error: "Failed to generate interview questions" },
      { status: 500 }
    );
  }
}
