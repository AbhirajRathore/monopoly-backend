const multer = require("multer");
const path = require("path");
const os = require("os")

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: (req, file, cb) => {
    cb(null, path.join(os.tmpdir()));
  },
  filename: (req, file, cb) => {
    const dateStamp = Date.now();
    cb(
      null,
      file.fieldname + "" + dateStamp + path.extname(file.originalname)
    );
  },
});

const imageUploadPinata = multer({
  storage: imageStorage,
  limits: {
    fileSize: 30000000, // 30000000 Bytes = 30 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|webm)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload the valid image file"));
    }
    cb(null, true);
  },
});

// disk storage image
const imageDiskStorage = multer.diskStorage({
  // Destination to store image
  destination: (req, file, cb) => {
    console.log("file: ", file);
    cb(null, './images');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(
      null,
      uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const imageUploadDisk = multer({
  storage: imageDiskStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|webm)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload the valid image file"));
    }
    cb(null, true);
  },
});

module.exports = {imageUploadPinata, imageUploadDisk};
