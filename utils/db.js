// utils/db.js
import { neon } from "@neondatabase/serverless"; // Neon database client
import { drizzle } from "drizzle-orm/neon-http"; // Drizzle ORM
import * as schema from "./schema"; // Assuming you have a schema for your database

// Create the Neon database client using the DATABASE_URL environment variable
const sql = neon(process.env.DATABASE_URL);

// Initialize Drizzle ORM with the Neon client and the schema
export const db = drizzle({ client: sql, schema });

// Test the connection (optional, to check if the database is connected properly)
const testConnection = async () => {
  try {
    const result = await db.execute("SELECT NOW()");
    console.log("Database connected successfully:", result);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

testConnection(); // Call this function to test the connection
