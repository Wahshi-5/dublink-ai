const fs = require("fs");
const path = require("path");

const transcribeVideo = async (req, res) => {
    try {
        const fileName = req.body.file;

        if (!fileName) {
            return res.status(400).json({
                message: "Video file required"
            });
        }

        // file path
        const filePath = path.join(__dirname, "../uploads", fileName);

        // 🔥 MOCK TRANSCRIPTION (because no API)
        // later we will replace with OpenAI Whisper
        const fakeText = `
Hello everyone,
This is a sample transcription from the uploaded video.
We are building DubLink AI system step by step.
        `;

        res.json({
            message: "Transcription successful (MOCK)",
            text: fakeText
        });

    } catch (error) {
        res.status(500).json({
            message: "Transcription failed",
            error: error.message
        });
    }
};

module.exports = { transcribeVideo };