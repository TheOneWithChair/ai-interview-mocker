"use client"
import React, { useEffect ,useState} from 'react'
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { Button } from "@/components/ui/Button"
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import Link from "next/link";


function StartInterview({params}) {
      const interviewId = React.use(params).interviewId
      const [interviewData, setInterviewData] = useState(null)
      const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
      const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
     useEffect(() => {
        GetInterviewDetails()
     }, [])
      const GetInterviewDetails = async () => {
         try {
           const result = await db
             .select()
             .from(MockInterview)
             .where(eq(MockInterview.mockId, interviewId))
             const jsonMockResp = JSON.parse(result[0].jsonMockResp);
             console.log(jsonMockResp);
             setMockInterviewQuestion(jsonMockResp);
           setInterviewData(result[0])
           
         } catch (error) {
           console.error('Error fetching interview:', error)
         }
       }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 my-10">
        {/* Questin Section */}
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        {/* Video/audio Recording */}
        <RecordAnswerSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex gap-3 my-5 md:my-0 md:justify-end md:gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};


export default StartInterview
