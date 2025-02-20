"use client"

import React, { useEffect, useState } from 'react'
import { db } from "@/utils/db"
import { MockInterview } from "@/utils/schema"
import { eq } from "drizzle-orm"
import { Webcam } from 'lucide-react'

export default function Interview({ params }) {
  const interviewId = React.use(params).interviewId
  const [interviewData, setInterviewData] = useState(null)

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
      console.log('Interview Data:', result[0]) // Detailed console output
      console.table(result) // Tabular format for better readability
    } catch (error) {
      console.error('Error fetching interview:', error)
    }
  }

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl text-center">Let's Get Started</h2>
      <div>
        {/* <Webcam/> */}
          
      </div>
    </div>
  )
}