ALTER TABLE "mockInterview" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "mockInterview" ALTER COLUMN "createdAt" SET DEFAULT now();