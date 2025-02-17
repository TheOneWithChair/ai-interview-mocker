// // pages/api/interviews.js
// import { db } from "@/utils/db"; // Ensure db.js is only used on the server side
// import { MockInterview } from "@/utils/schema"; // Adjust path if needed
// import { v4 as uuidv4 } from "uuid";
// import moment from "moment";

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { jobPosition, jobDescription, jobExperience, user } = req.body;
//     const mockId = uuidv4();
//     const createdAt = moment().format("DD-MM-YYYY");

//     try {
//       // Insert mock interview data into the database
//       const result = await db
//         .insert(MockInterview)
//         .values({
//           mockId,
//           jsonMockResp: JSON.stringify([]), // Set your mock response data here
//           jobPosition,
//           jobDesc: jobDescription,
//           jobExperience,
//           createdBy: user?.primaryEmailAddress?.emailAddress,
//           createdAt,
//         })
//         .returning({ mockId: MockInterview.mockId });

//       return res.status(200).json({ mockId: result[0]?.mockId });
//     } catch (error) {
//       console.error("Error inserting interview:", error);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//   } else {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }
// }


// pages/api/interviews.js
import { db } from "@/utils/db"; // Ensure db.js is only used on the server side
import { MockInterview } from "@/utils/schema"; // Adjust path if needed
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { jobPosition, jobDescription, jobExperience, user } = req.body;
    const mockId = uuidv4();
    const createdAt = moment().format("DD-MM-YYYY");

    try {
      // Insert mock interview data into the database
      const result = await db
        .insert(MockInterview)
        .values({
          mockId,
          jsonMockResp: JSON.stringify([]), // Set your mock response data here
          jobPosition,
          jobDesc: jobDescription,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt,
        })
        .returning({ mockId: MockInterview.mockId });

      return res.status(200).json({ mockId: result[0]?.mockId });
    } catch (error) {
      console.error("Error inserting interview:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
