"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const interviewId = React.use(params).interviewId;

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    try {
      const response = await fetch(
        `/api/user-answers?interviewId=${interviewId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }
      const result = await response.json();
      console.log(result);
      setFeedbackList(result);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  // Helper function to extract numeric rating from string formats like "7/10" or "7"
  const extractNumericRating = (rating) => {
    if (typeof rating === "number") return rating;
    if (typeof rating === "string") {
      const match = rating.match(/(\d+)/);
      return match ? parseInt(match[1]) : 0;
    }
    return 0;
  };

  // Helper function to format rating consistently
  const formatRating = (rating) => {
    const numRating = extractNumericRating(rating);
    return `${numRating}/10`;
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce((sum, item) => {
        return sum + extractNumericRating(item.rating);
      }, 0);
      return (totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500 my-5">
          No Interview feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">
            Congratulations! 🎉
          </h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>
          <h2 className="text-primary text-lg my-3">
            Your overall interview rating{" "}
            <strong
              className={`${
                overallRating >= 4 ? "text-green-500" : "text-orange-500"
              }`}
            >
              {overallRating}
              <span className="text-black">/10</span>
            </strong>
          </h2>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
            <p className="text-blue-700">
              {overallRating >= 7
                ? "🌟 Excellent work! You're demonstrating strong interview skills."
                : overallRating >= 5
                ? "👍 Good progress! Keep practicing to refine your responses."
                : "💪 Great start! Every practice session helps you improve. Focus on the feedback below to strengthen your answers."}
            </p>
          </div>
          <h2 className="text-sm text-gray-500">
            Find below interview questions with feedback to help you improve
            your responses
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
                  {item.question} <ChevronDown className="h-5 w-5" />{" "}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2
                      className={`p-2 border rounded-lg ${
                        extractNumericRating(item.rating) >= 4
                          ? "text-green-600 bg-green-50 border-green-200"
                          : "text-orange-600 bg-orange-50 border-orange-200"
                      }`}
                    >
                      <strong>Rating: </strong>
                      {formatRating(item.rating)}
                      {extractNumericRating(item.rating) >= 7
                        ? " 🌟"
                        : extractNumericRating(item.rating) >= 5
                        ? " 👍"
                        : " 💪"}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-gray-50 text-sm text-gray-800">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-800">
                      <strong>Sample Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-800">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default Feedback;
