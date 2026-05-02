const express = require("express");
const multer = require("multer");
const path = require("path");
const { transcribeVideo } = require("../controllers/transcribeController");

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

// upload + transcribe in one step
router.post("/transcribe", upload.single("video"), transcribeVideo);

module.exports = router;