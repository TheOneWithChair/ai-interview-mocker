const { defineConfig } = require("drizzle-kit");



export default defineConfig({
    dialect: "postgresql",
    schema: "./utils/schema.ts", // Change .js -> .ts
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL
    },
  });
  
// const { defineConfig } = require("drizzle-kit");
// require('dotenv').config();

// module.exports = defineConfig({
//   schema: "./utils/schema.js",
//   out: "./migrations",
//   dialect: "pg",
//   verbose: true,
//   strict: true,
//   dbCredentials: {
//     connectionString: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL
//   }
// });