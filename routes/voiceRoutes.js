const express = require("express");
const router = express.Router();
const { generateVoice } = require("../controllers/voiceController");

router.post("/", generateVoice);

module.exports = router;