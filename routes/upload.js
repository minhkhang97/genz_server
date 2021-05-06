const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/public/images");
  },
  filename: function (req, file, cb) {
    req.fileUpload = {
      alt: file.originalname,
      url:
        "http://localhost:" + process.env.PORT + "/images/" + file.originalname,
    };
    cb(null, file.originalname);
  },
});

const upload = multer({storage});

router.post('/', upload.single('photo'), (req, res) => {
    return res.status(200).json(req.fileUpload);
})

module.exports = router;
