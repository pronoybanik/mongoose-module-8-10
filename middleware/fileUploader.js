const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: "images/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "-" + file.originalname)
  }
})

const fileUploader = multer({
  storage,

  // single file uploading use dest
  // dest: "images/",
  fileFilter: (req, file, cb) => {
    const supportedImage = /png|jpg|webp/;
    const extension = path.extname(file.originalname);

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("Must be a png/jpg image"));
    }

  },
  limits: {
    fileSize: 5000000,
  }
})

module.exports = fileUploader;