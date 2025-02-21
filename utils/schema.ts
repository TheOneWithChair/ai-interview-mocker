import { serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 1000 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),  // ✅ Changed to timestamp
  mockId: varchar("mockId", { length: 255 }).notNull(),
});

export const Question = pgTable("question", {
  id: serial("id").primaryKey(),
  MockQuestionJsonResp: text("MockQuestionJsonResp").notNull(),
  jobPosition: varchar("jobPosition", { length: 255 }).notNull(),
  jobDesc: varchar("jobDesc", { length: 1000 }).notNull(),
  jobExperience: varchar("jobExperience", { length: 255 }).notNull(),
  typeQuestion: varchar("typeQuestion", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  createdBy: varchar("createdBy", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  mockId: varchar("mockId", { length: 255 }).notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId", { length: 255 }).notNull(), // ✅ Changed key name for clarity
  question: text("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating", { length: 10 }),
  userEmail: varchar("userEmail", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

export const Newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  newName: varchar("newName", { length: 255 }),
  newEmail: varchar("newEmail", { length: 255 }),
  newMessage: text("newMessage"),
  createdAt: timestamp("createdAt").defaultNow(),
});
