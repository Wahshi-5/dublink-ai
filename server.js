const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(); // 🔥 MUST be first after imports

const videoRoutes = require("./routes/videoRoutes");
const transcribeRoutes = require("./routes/transcribeRoutes");
const translateRoutes = require("./routes/translateRoutes");
const voiceRoutes = require("./routes/voiceRoutes");
const dubRoutes = require("./routes/dubRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/videos", videoRoutes);
app.use("/api/transcribe", transcribeRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/voice", voiceRoutes);
app.use("/api/dub", dubRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/output", express.static(path.join(__dirname, "output")));

app.get("/", (req, res) => {
    res.send("DubLink AI Server Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});