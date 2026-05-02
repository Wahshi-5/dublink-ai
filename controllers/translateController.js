const translateText = async (req, res) => {
    try {
        const { text, language } = req.body;

        if (!text || !language) {
            return res.status(400).json({
                message: "Text and language are required"
            });
        }

        // 🔥 MOCK TRANSLATION (no OpenAI needed)
        let translatedText = "";

        if (language.toLowerCase().includes("kinyarwanda")) {
            translatedText = "Muraho, " + text;
        } 
        else if (language.toLowerCase().includes("kiswahili")) {
            translatedText = "Habari, " + text;
        } 
        else {
            translatedText = "[MOCK] " + text;
        }

        res.json({
            translatedText
        });

    } catch (error) {
        res.status(500).json({
            message: "Translation failed",
            error: error.message
        });
    }
};

module.exports = { translateText };