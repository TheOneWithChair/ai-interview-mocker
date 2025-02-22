"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
    {
      "question": "Your question here",
      "answer": "Your answer here"
    }`;

    try {
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();
      
      // Remove markdown code blocks if present
      let cleanedText = responseText.replace(/```json|```/g, '').trim();
      
      // Try to find valid JSON array in the response
      const jsonMatch = cleanedText.match(/\[\s*\{[\s\S]*\}\s*\]/s);
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in the response");
      }
      
      const jsonResponsePart = jsonMatch[0];
      const mockResponse = JSON.parse(jsonResponsePart.trim());
      
      try {
        const res = await db.insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: JSON.stringify(mockResponse),
            jobPosition: jobPosition,
            jobDesc: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            // createdAt will use defaultNow() from schema
          })
          .returning({ mockId: MockInterview.mockId });

        setLoading(false);
        router.push(`/dashboard/interview/${res[0]?.mockId}`);
      } catch (dbError) {
        console.error("Database error:", dbError);
        setError("Failed to save interview. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to generate interview questions. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h1 className="font-bold text-lg text-center">+ Add New</h1>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your job Interview
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {error && (
              <div className="p-3 mb-4 text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}
            <div className="text-sm text-muted-foreground mb-4">
              Add details about your job position/role, job description, and
              years of experience
            </div>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block mb-2">Job Role/Job Position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">Job Description/Tech Stack (In short)</label>
                <Textarea
                  placeholder="Ex. React, Angular, NodeJs, MySql etc"
                  required
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="block mb-2">Years of Experience</label>
                <Input
                  placeholder="Ex. 5"
                  type="number"
                  min="1"
                  max="70"
                  required
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
              <div className="flex gap-5 justify-end pt-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" /> 
                      Generating from AI
                    </>
                  ) : (
                    'Start Interview'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;