const { defineConfig } = require("drizzle-kit");
require("dotenv").config();

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.ts", // Change .js -> .ts
  dbCredentials: {
    url: process.env.DRIZZLE_DB_URL,
  },
});

// /** @type { import("drizzle-kit").Config } */
// import "dotenv/config"; // ✅ Load .env file

// export default {
//     schema: "./utils/schema.js",
//     dialect: "postgresql",
//     dbCredentials: {
//         url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL, // ✅ Ensure it's correctly read
//     },
// };

// const { defineConfig } = require("drizzle-kit");
// require('dotenv').config();

// module.exports = defineConfig({
//   schema: "./utils/schema.ts",
//   out: "./drizzle",
//   dialect: "pg",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL
//   }
// });
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
