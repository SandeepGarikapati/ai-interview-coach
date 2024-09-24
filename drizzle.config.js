/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://ai_owner:QAxzR2p3ikIh@ep-tiny-mode-a1rsngl4.ap-southeast-1.aws.neon.tech/ai?sslmode=require",
    }
  }