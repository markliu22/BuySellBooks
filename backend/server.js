import express from "express";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import uploadRoute from "./routes/uploadRoute";

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

app.use("/api/uploadRoute", uploadRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

// app.use("/uploads", express.static(path.join(__dirname, "/../uploads"))); //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join('${__dirname}/../frontend/build/index.html'));
app.listen(config.PORT, …)

///////////////////// Changed 5000 to config.PORT
app.listen(config.PORT, () => {
  console.log("Server is running at port 5000");
});
