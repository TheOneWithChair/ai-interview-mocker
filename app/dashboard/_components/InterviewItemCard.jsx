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
import React from 'react';
import { Button } from "@/components/ui/Button";
import { useRouter } from 'next/navigation';
import moment from 'moment';

const InterviewItemCard = ({interview}) => {
    const router = useRouter();
    
    const onStart = () => {
        router.push("/dashboard/interview/"+interview?.mockId);
    };
    
    const onFeedback = () => {
        router.push("/dashboard/interview/"+interview?.mockId+"/feedback");
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'No date available';
        
        try {
            // Try parsing the date string
            const date = moment(String(dateString));
            if (date.isValid()) {
                return date.format('MMMM Do YYYY, h:mm a');
            }
            
            // Fallback to current date if no valid date is available
            return moment().format('MMMM Do YYYY, h:mm a');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Date unavailable';
        }
    };

    return (
        <div className="border border-gray-500 shadow-sm rounded-lg p-3">
            <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of experience</h2>
            <h2 className="text-xs text-gray-400">
                Created At: {formatDate(interview?.createdAt)}
            </h2>
            <div className='flex justify-between mt-2 gap-5'>
                <Button onClick={onFeedback} size="sm" className="w-full">Feedback</Button>
                <Button onClick={onStart} size="sm" className="w-full">Start</Button>
            </div>
        </div>
    );
};

export default InterviewItemCard;