import express from "express";
import path from "path";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import uploadRoute from "./routes/uploadRoute";

// Connect to database
mongoose.connect(
  process.env.MONGODB_URL || process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("DATABASE CONNECTED!!!");
  }
);

const app = express();

app.use(bodyParser.json());

// Inside uploadRoute.js, the '/' is the same as '/api/uploads'. Always going to be the same as the first parameter
app.use("/api/uploads", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// For production
// app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
// app.use(express.static(path.join(__dirname, "/../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
// });

// listen on the PORT from config
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
