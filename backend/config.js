// Check .env file for MONGODB_URL, if not there use the string
// Check .env file for JWT_SECRET, if not there use the string
export default {
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/MyCluster1",
  JWT_SECRET: process.env.JWT_SECRET || "mysecret",
};
