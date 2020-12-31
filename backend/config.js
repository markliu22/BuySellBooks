// config files should be limited to key:value format
import dotenv from "dotenv";

dotenv.config();

// Check .env file for _____, if it's not there, use the string
export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/MyCluster1",
  JWT_SECRET: process.env.JWT_SECRET || "mysecret",
  accessKeyId: process.env.accessKeyId || "accessKeyId",
  secretAccessKey: process.env.secretAccessKey || "secretAccessKey",
};
