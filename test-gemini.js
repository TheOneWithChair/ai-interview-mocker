const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config({ path: ".env.local" });

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log(
    "API Key:",
    apiKey ? `${apiKey.substring(0, 10)}...` : "Not found"
  );

  // Test if the API key works at all
  console.log("\nTesting API key validity by making a simple request...\n");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.log("API Key Error:", response.status, errorText);
      console.log("\n⚠️  Your API key appears to be invalid or expired.");
      console.log(
        "Please generate a new API key at: https://aistudio.google.com/app/apikey"
      );
      return;
    }

    const data = await response.json();
    console.log("✓ API Key is valid!\n");
    console.log("Available models:");

    if (data.models) {
      const supportedModels = data.models.filter((m) =>
        m.supportedGenerationMethods?.includes("generateContent")
      );

      supportedModels.forEach((model) => {
        console.log(`  - ${model.name}`);
      });

      // Try the first available model
      if (supportedModels.length > 0) {
        const modelName = supportedModels[0].name;
        console.log(`\nTrying to use: ${modelName}\n`);

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName.replace("models/", ""),
        });
        const result = await model.generateContent("Say hello");
        const response = await result.response.text();
        console.log(`✓ SUCCESS: ${response}\n`);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testGemini();
