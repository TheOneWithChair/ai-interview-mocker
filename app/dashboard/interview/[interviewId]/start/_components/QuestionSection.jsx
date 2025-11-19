
// import { Lightbulb, Volume2 } from "lucide-react";
// import React from "react";

// const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
//   const textToSpeech = (text) => {
//     if ("speechSynthesis" in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     } else {
//       alert("Sorry, your browser does not support text to speech.");
//     }
//   };

//   return (
//     mockInterviewQuestion && mockInterviewQuestion.length > 0 && (
//       <div className="flex flex-col justify-between p-5 border rounded-lg my-1 bg-secondary">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
//           {mockInterviewQuestion.map((question, index) => (
//             <h2
//               key={index} // ✅ Fix: Added a unique key for each mapped element
//               className={`p-2 rounded-full text-center text-xs md:text-sm cursor-pointer md:block hidden ${
//                 activeQuestionIndex === index
//                   ? "bg-black text-white"
//                   : "bg-secondary"
//               }`}
//             >
//               Question #{index + 1}
//             </h2>
//           ))}
//         </div>

//         {/* ✅ Fix: Corrected the key name from "Question" to "question" */}
//         <h2 className="my-5 text-md md:text-lg">
//           {mockInterviewQuestion[activeQuestionIndex]?.question}
//         </h2>

//         <Volume2
//           className="cursor-pointer"
//           onClick={() =>
//             textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
//           }
//         />

//         <div className="border rounded-lg p-5 bg-blue-100 mt-18 md:block hidden">
//           <h2 className="flex gap-2 items-center text-blue-800">
//             <Lightbulb />
//             <strong>Note:</strong>
//           </h2>
//           <h2 className="text-sm text-blue-600 my-2">
//             {process.env.NEXT_PUBLIC_QUESTION_NOTE}
//           </h2>
//         </div>
//       </div>
//     )
//   );
// };

// export default QuestionSection;


"use client"

import { Lightbulb, Volume2 } from "lucide-react"
import React, { useCallback } from "react"

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = useCallback((text) => {
    if (typeof window !== 'undefined' && "speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text)
      window.speechSynthesis.speak(speech)
    } else {
      console.warn("Text to speech not supported")
    }
  }, [])

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col justify-between p-5 border rounded-lg my-1 bg-secondary">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-center text-xs md:text-sm cursor-pointer md:block hidden ${
              activeQuestionIndex === index
                ? "bg-black text-white"
                : "bg-secondary"
            }`}
          >
            Question {index + 1}
          </h2>
        ))}
      </div>

      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </h2>

      <Volume2
        className="cursor-pointer"
        onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
      />

      <div className="border rounded-lg p-5 bg-blue-100 mt-18 md:block hidden">
        <h2 className="flex gap-2 items-center text-blue-800">
          <Lightbulb className="h-5 w-5" />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-blue-600 my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  )
}

export default QuestionSection