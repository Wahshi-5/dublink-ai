const express = require("express");
const router = express.Router();

const { dubVideo } = require("../controllers/dubController");

// 🔥 ONE CLICK DUB ROUTE
router.post("/", dubVideo);

module.exports = router;