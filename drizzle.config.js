const { defineConfig } = require("drizzle-kit");



export default defineConfig({
    dialect: "postgresql",
    schema: "./utils/schema.ts", // Change .js -> .ts
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_JP8XIZFxq6kg@ep-fancy-sun-a1uav4xt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    },
  });
  