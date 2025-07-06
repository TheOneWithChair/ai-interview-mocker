import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { question, userAnswer } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const feedbackPrompt = `
      Question: ${question}
      User Answer: ${userAnswer}
      
      Please evaluate this interview answer as a supportive career coach. Your goal is to help the candidate improve while building their confidence.
      
      Provide feedback in JSON format with this structure:
      {
        "rating": 6,
        "feedback": "Your encouraging and constructive feedback here"
      }
      
      Guidelines:
      - Rating: Use 4-8 for most practice answers (1-3 only for very poor responses, 9-10 for exceptional ones)
      - Start with something positive they did well
      - Provide 2-3 specific, actionable improvements
      - Use encouraging language throughout
      - End with motivation to keep practicing
      - Focus on growth mindset: "Here's how to make it even better..."
      
      Example good feedback: "Good job addressing the main question! To make your answer stronger, try adding a specific example and organizing your response with the STAR method. You're on the right track - keep practicing!"
      
      Return valid JSON only with a NUMBER rating (not string like "6/10").
    `;

    const result = await model.generateContent(feedbackPrompt);
    const response = await result.response;
    const feedbackText = response.text();

    // Try to extract JSON from the response
    let feedbackJson;
    try {
      // Remove markdown code blocks if present
      let cleanedText = feedbackText.replace(/```json|```/g, "").trim();

      // Try to find valid JSON object in the response
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        feedbackJson = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found");
      }
    } catch (parseError) {
      console.log("Failed to parse JSON, using fallback format");
      // Fallback: create JSON structure from text
      feedbackJson = {
        rating: 6, // More encouraging default rating
        feedback: feedbackText,
      };
    }

    // Ensure rating is reasonable and encouraging (minimum 3, adjust very low ratings)
    if (feedbackJson.rating && typeof feedbackJson.rating === "number") {
      if (feedbackJson.rating < 3) {
        feedbackJson.rating = Math.max(3, feedbackJson.rating + 1); // Boost very low ratings
      }
      // Ensure rating is within 1-10 range
      feedbackJson.rating = Math.min(10, Math.max(1, feedbackJson.rating));
    } else {
      feedbackJson.rating = 6; // Safe default
    }

    return Response.json({
      success: true,
      feedbackData: feedbackJson,
    });
  } catch (error) {
    console.error("Error generating feedback:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to generate feedback",
      },
      { status: 500 }
    );
  }
}
