const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post("/upload", upload.single("video"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No video uploaded"
        });
    }

    res.status(200).json({
        message: "Video uploaded successfully",
        file: req.file.filename
    });
});

module.exports = router;