// import express and multer
import express from "express";
import multer from "multer";

// AWS upload
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import config from "../config";

// create disk storage with Date.now().jpg as filename
// Created a folder called uploads, uploaded files will go there
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`); // First parameter of callback is null, second is the name of the file, we using the current timestamp
  },
});

// Set upload as multer({ storage })
const upload = multer({ storage });

const router = express.Router();

// Need to define a post method to get a file and save it on the computer
// Need to use the upload middleware, single means only upload 1 file.
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

// First param is the accesskeyId, second is the secretAccessKey
aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});
// Do this to get access to the S3 storage
const s3 = new aws.S3();
// Now use multerS3. Apply some configs inside the curly braces. First is s3 itself, second is bucket (add bucket name), Third is acl which is about the permission, set it to 'public-read' to make it publically readable, Fourth is content type which is set to auto, Last one is key
const storageS3 = multerS3({
  s3,
  bucket: "buysellbooks-bucket",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});
// Create an instance of multer, set storage to storageS3
const uploadS3 = multer({ storage: storageS3 });

// Handle POST request on /api/uploads/s3
// Use the same "single" middleware as with the local uploads, pass name of file which is 'image'
router.post("/s3", uploadS3.single("image"), (req, res) => {
  // Send location of file on the AWS S3 server
  res.send(req.file.location);
});

export default router;
