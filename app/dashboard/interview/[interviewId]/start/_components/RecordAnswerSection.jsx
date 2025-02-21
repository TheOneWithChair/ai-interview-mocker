"use client";

import { Button } from "@/components/ui/Button";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { WebCamContext } from "@/app/dashboard/layout";
import { GoogleGenerativeAI } from "@google/generative-ai";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
  }, [userAnswer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast("Error starting recording. Please check your microphone permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Convert audio blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        const result = await model.generateContent([
          "Transcribe the following audio:",
          { inlineData: { data: base64Audio, mimeType: "audio/webm" } },
        ]);

        const transcription = result.response.text();
        setUserAnswer((prevAnswer) => prevAnswer + " " + transcription);
        setLoading(false);
      };
    } catch (error) {
      console.error("Error transcribing audio:", error);
      toast("Error transcribing audio. Please try again.");
      setLoading(false);
    }
  };

  const updateUserAnswer = async () => {
    try {
      setLoading(true);
  
      // 🔹 Debugging: Log mockInterviewQuestion and activeQuestionIndex
      console.log("🔍 Current activeQuestionIndex:", activeQuestionIndex);
      console.log("🔍 mockInterviewQuestion:", mockInterviewQuestion);
  
      // Get the current question
      const questionText = mockInterviewQuestion?.[activeQuestionIndex]?.question;
  
      // 🔹 Debugging: Log the question before proceeding
      console.log("🔍 Extracted Question:", questionText);
  
      if (!questionText) {
        throw new Error("❌ Question is missing or undefined.");
      }
  
      const feedbackPrompt = `
        Question: ${questionText}
        User Answer: ${userAnswer}
        Please provide a rating and feedback in JSON format (fields: rating, feedback).
      `;
  
      const result = await chatSession.sendMessage(feedbackPrompt);
      let MockJsonResp = await result.response.text();
  
      // Extract valid JSON
      let jsonFeedbackResp;
      try {
        const jsonMatch = MockJsonResp.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jsonFeedbackResp = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Invalid JSON response.");
        }
      } catch (e) {
        console.error("Error parsing JSON:", MockJsonResp);
        toast("Error processing feedback. Please try again.");
        return;
      }
  
      const insertData = {
        mockIdRef: interviewData?.mockId || "Unknown Mock ID",
        question: questionText, // ✅ Ensuring question is not null
        correctAns: mockInterviewQuestion?.[activeQuestionIndex]?.Answer || "N/A",
        userAns: userAnswer || "No answer provided",
        feedback: jsonFeedbackResp?.feedback || "No feedback",
        rating: jsonFeedbackResp?.rating || "No rating",
        userEmail: user?.primaryEmailAddress?.emailAddress || "Unknown",
        createdAt: new Date(), // ✅ Ensure timestamp is a Date object
      };
  
      console.log("🔹 Data to Insert:", insertData);
  
      const resp = await db.insert(UserAnswer).values(insertData);
  
      if (resp) {
        console.log("✅ Insert successful:", resp);
        toast("User Answer recorded successfully");
      } else {
        throw new Error("Database insert failed");
      }
  
      setUserAnswer("");
    } catch (error) {
      console.error("🚨 DB Insert Error:", error);
      toast(error.message || "Failed to save your answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col justify-center items-center rounded-lg p-5 bg-black mt-4 w-[30rem] ">
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            style={{ height: 250, width: "100%", zIndex: 10 }}
          />
        ) : (
          <Image src={"/camera.jpg"} width={200} height={200} alt="Camera placeholder" />
        )}
      </div>
      <div className="md:flex mt-4 md:mt-8 md:gap-5">
        <div className="my-4 md:my-0">
          <Button onClick={() => setWebCamEnabled((prev) => !prev)}>
            {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={loading}
        >
          {isRecording ? (
            <h2 className="text-red-400 flex gap-2 ">
              <Mic /> Stop Recording...
            </h2>
          ) : (
            " Record Answer"
          )}
        </Button>
      </div>
      {/* Check transcription code */}
      {/* {userAnswer && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-bold">Transcribed Answer:</h3>
          <p>{userAnswer}</p>
        </div>
      )} */}
    </div>
  );
};

export default RecordAnswerSection;

