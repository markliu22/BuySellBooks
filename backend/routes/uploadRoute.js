// import express and multer
import express from "express";
import multer from "multer";

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

export default router;
