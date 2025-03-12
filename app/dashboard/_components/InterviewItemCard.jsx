// import React from 'react'
// import { Button } from "@/components/ui/Button"
// import { useRouter } from 'next/navigation'
// import moment from 'moment'

// const InterviewItemCard = ({interview}) => {
//     const router = useRouter()
    
//     // Add this console.log to see the actual value and type
//     console.log('CreatedAt value:', interview?.createdAt);
//     console.log('CreatedAt type:', typeof interview?.createdAt);
    
//     const onStart = () => {
//         router.push("/dashboard/interview/"+interview?.mockId)
//     }
    
//     const onFeedback = () => {
//         router.push("/dashboard/interview/"+interview?.mockId+"/feedback")
//     }

//     const formatDate = (dateString) => {
//         if (!dateString) return 'No date available';
        
//         // Try parsing the date directly first
//         const date = moment(dateString);
//         if (date.isValid()) {
//             return date.format('MMMM Do YYYY, h:mm a');
//         }
        
//         // If that fails, try parsing as DD-MM-YYYY
//         const altDate = moment(dateString, 'DD-MM-YYYY');
//         if (altDate.isValid()) {
//             return altDate.format('MMMM Do YYYY');
//         }

//         return 'Invalid date format';
//     }

//     return (
//         <div className="border border-gray-500 shadow-sm rounded-lg p-3">
//             <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
//             <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of experience</h2>
//             <h2 className="text-xs text-gray-400">
//                 Created At: {formatDate(interview?.createdAt)}
//             </h2>
//             <div className='flex justify-between mt-2 gap-5'>
//                 <Button onClick={onFeedback} size="sm" className="w-full">Feedback</Button>
//                 <Button onClick={onStart} size="sm" className="w-full">Start</Button>
//             </div>
//         </div>
//     )
// }

// export default InterviewItemCard
// InterviewItemCard.jsx
import React from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import moment from "moment";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };

  const onFeedback = () => {
    router.push("/dashboard/interview/" + interview?.mockId + "/feedback");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date available";
    try {
      const date = moment(String(dateString));
      return date.isValid() ? date.format("MMMM Do YYYY, h:mm a") : "Date unavailable";
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date unavailable";
    }
  };

  return (
    <div className="bg-white border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg p-5">
      {/* Job Position */}
      <h2 className="font-semibold text-lg text-gray-900">{interview?.jobPosition}</h2>
      <h3 className="text-gray-600 text-sm">{interview?.jobExperience} Years of Experience</h3>

      {/* Created Date */}
      <p className="text-xs text-gray-500 mt-1">Created At: {formatDate(interview?.createdAt)}</p>

      {/* Button Actions */}
      <div className="flex gap-4 mt-4">
      <Button
          onClick={onFeedback}
          size="sm"
          className="w-full py-2 bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text border border-gray-700 hover:border-[#001E80] transition-all rounded-lg"
        >
          View Feedback
        </Button>
        <Button
          onClick={onStart}
          size="sm"
          className="w-full py-2 text-white bg-black hover:bg-gray-900 transition-all rounded-lg"
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
