import express from "express";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";

dotenv.config();

// Get access to mongodb url
// const mongodbUrl = config.MONGODB_URL; Just Commented OUTTTTTTTTTTTTTTTTTTTTTTT
// mongoose.connect("mongodb://localhost/MyCluster1", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
// });

// Just addeddddddddddddddddddddddddddddddddd
mongoose.connect(
  // Step 2
  process.env.MONGODB_URL || process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("DATABASE CONNECTED!!!");
  }
);

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
