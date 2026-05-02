require("dotenv").config();

const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const transcribeVideo = async (req, res) => {
    try {
        const filePath = path.join(__dirname, "../uploads", req.file.filename);

        const transcription = await client.audio.transcriptions.create({
            file: fs.createReadStream(filePath),
            model: "whisper-1",
        });

        res.status(200).json({
            message: "Transcription successful",
            text: transcription.text
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Transcription failed",
            error: error.message
        });
    }
};

module.exports = { transcribeVideo };