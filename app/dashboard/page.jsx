import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="p-10" >
      <h2 className="text-5xl sm:text-6xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-black to-[#001E80] mt-6 leading-tight">
            DashBoard
          </h2>
      <h2 className="text-gray-500" >Create and start your AI Mockup Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 my-5" >
        <AddNewInterview/>
      </div>

      <InterviewList/>
    </div>
  );
};

export default Dashboard;
