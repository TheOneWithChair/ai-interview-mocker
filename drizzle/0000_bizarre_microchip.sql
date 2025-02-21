CREATE TABLE "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResp" text NOT NULL,
	"jobPosition" varchar(255) NOT NULL,
	"jobDesc" varchar(1000) NOT NULL,
	"jobExperience" varchar(255) NOT NULL,
	"createdBy" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"mockId" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "newsletter" (
	"id" serial PRIMARY KEY NOT NULL,
	"newName" varchar(255),
	"newEmail" varchar(255),
	"newMessage" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"MockQuestionJsonResp" text NOT NULL,
	"jobPosition" varchar(255) NOT NULL,
	"jobDesc" varchar(1000) NOT NULL,
	"jobExperience" varchar(255) NOT NULL,
	"typeQuestion" varchar(255) NOT NULL,
	"company" varchar(255) NOT NULL,
	"createdBy" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"mockId" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" varchar(255) NOT NULL,
	"question" text NOT NULL,
	"correctAns" text,
	"userAns" text,
	"feedback" text,
	"rating" varchar(10),
	"userEmail" varchar(255),
	"createdAt" timestamp DEFAULT now()
);
