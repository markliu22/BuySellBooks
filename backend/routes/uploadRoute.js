import express from "express";
import multer from "multer";
// For AWS upload:
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import config from "../config";

// FOR LOCAL STORAGE, BEFORE I CHANGED TO AWS: =================================================================================================================================================
// TUT: https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
// Set storage location for the files. Multer gives the option of storing files to disk
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`); // First parameter of callback is null, second is the name of the file, use the current timestamp
  },
});
// Set upload as multer({ storage }). This is also a part of the previous step
const upload = multer({ storage });
const router = express.Router();

// Handle POST request on /uploads
// Need to define a post method to get a file and save it on the computer. ".single()" bc 1 file
router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

// FOR AWS: ======================================================================================================================================================================================
aws.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
});
// Need this to get access to the S3 storage
const s3 = new aws.S3();
// Use multerS3, configs inside the curly braces. First is s3 itself. Second is bucket (add bucket name). Third is acl (permission), set it to 'public-read' (to make it publically readable. Fourth is content type which is set to auto. Last one is key.
const storageS3 = multerS3({
  s3,
  bucket: "buysellbooks-bucket",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});

// Create instance of multer, set storage to storageS3
const uploadS3 = multer({ storage: storageS3 });

// Handle POST request on /api/uploads/s3
// .single() middleware bc 1 file, pass name of file which is 'image'
router.post("/s3", uploadS3.single("image"), (req, res) => {
  // Send location of file on the AWS S3 server
  res.send(req.file.location);
});

export default router;
