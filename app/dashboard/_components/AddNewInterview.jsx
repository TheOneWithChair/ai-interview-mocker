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
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
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

    try {
      // Generate questions using the API
      const questionsResponse = await fetch("/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobPosition,
          jobDescription,
          jobExperience,
          questionCount: process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT || 5,
        }),
      });

      if (!questionsResponse.ok) {
        throw new Error("Failed to generate questions");
      }

      const questionsResult = await questionsResponse.json();

      if (!questionsResult.success) {
        throw new Error("Failed to generate interview questions");
      }

      const mockResponse = questionsResult.questions;

      try {
        const mockId = uuidv4();
        const response = await fetch("/api/interviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mockId: mockId,
            jsonMockResp: JSON.stringify(mockResponse),
            jobPosition: jobPosition,
            jobDescription: jobDescription,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create interview");
        }

        const result = await response.json();
        setLoading(false);
        router.push(`/dashboard/interview/${result.mockId}`);
      } catch (dbError) {
        console.error("Database error:", dbError);
        setError("Failed to save interview. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.message ||
          "Failed to generate interview questions. Please try again."
      );
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
                <label className="block mb-2">
                  Job Description/Tech Stack (In short)
                </label>
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
                    "Start Interview"
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
