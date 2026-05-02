const translateText = async (req, res) => {
    try {
        const { text, language } = req.body;

        if (!text || !language) {
            return res.status(400).json({
                message: "Text and language are required"
            });
        }

        // 🔥 MOCK TRANSLATION (no API needed)
        let translatedText = text;

        if (language.toLowerCase().includes("kinyarwanda")) {
            translatedText = "Muraho! " + text;
        } 
        else if (language.toLowerCase().includes("kiswahili")) {
            translatedText = "Habari! " + text;
        } 
        else {
            translatedText = "[TRANSLATED] " + text;
        }

        res.json({
            message: "Translation successful",
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