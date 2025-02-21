"use client"

import React, { useEffect, useState } from 'react'
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { WebcamIcon } from 'lucide-react'
import { Button } from "@/components/ui/Button"
import ReactWebcam from "react-webcam"

export default function Interview({ params }) {
  const interviewId = React.use(params).interviewId
  const [interviewData, setInterviewData] = useState(null)
  const [webCamEnabled, setWebCamEnabled] = useState(false)

  useEffect(() => {
    GetInterviewDetails()
  }, [interviewId])
  
  const GetInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId))
      
      setInterviewData(result[0])
      console.log('Interview Data:', result[0])
      console.table(result)
    } catch (error) {
      console.error('Error fetching interview:', error)
    }
  }

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-center">Let's Get Started</h2>
      <div>
        {webCamEnabled ? (
          <div className="flex items-center justify-center p-10">
            <ReactWebcam
              onUserMedia={() => setWebCamEnabled(true)}
              onError={() => setWebCamEnabled(false)}
              height={300}
              width={300}
              mirrored="true"
            />
          </div>
        ) : (
          <div>
            <WebcamIcon className="h-72 w-full my-6 p-20 bg-secondary rounded-lg border" />
            <Button onClick={() => setWebCamEnabled(true)}>Enable Webcam</Button>
          </div>
        )}
      </div>
    </div>
  )
}