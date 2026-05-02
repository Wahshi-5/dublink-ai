const say = require("say");
const path = require("path");

const generateVoice = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                message: "Text is required"
            });
        }

        const fileName = `voice_${Date.now()}.mp3`;
        const filePath = path.join(__dirname, "../output", fileName);

        // 🎙️ Offline Windows voice
        say.export(text, null, 1.0, filePath, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Voice generation failed",
                    error: err.message
                });
            }

            res.json({
                message: "Voice generated successfully",
                audioFile: fileName
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { generateVoice };