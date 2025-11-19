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
    
    // Try multiple models in case of rate limiting or availability issues
    const modelNames = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-flash-lite"];
    let result;
    let lastError;
    
    for (const modelName of modelNames) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        
        const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${
          questionCount || 5
        } Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
        {
          "question": "Your question here",
          "answer": "Your answer here"
        }`;

        result = await model.generateContent(inputPrompt);
        break; // Success, exit loop
      } catch (error) {
        lastError = error;
        console.log(`Failed with ${modelName}, trying next model...`);
        continue;
      }
    }
    
    if (!result) {
      throw lastError || new Error("All models failed");
    }
    
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
