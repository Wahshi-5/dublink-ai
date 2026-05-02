const fs = require("fs");
const path = require("path");

// reuse your existing functions (mock versions)
const transcribeVideo = (file) => {
    return `
Hello everyone,
This is a DubLink AI automated transcription.
    `;
};

const translateText = (text, language) => {
    if (language.toLowerCase().includes("kinyarwanda")) {
        return "Muraho! " + text;
    }
    if (language.toLowerCase().includes("kiswahili")) {
        return "Habari! " + text;
    }
    return text;
};

const generateVoice = (text, outputFile) => {
    const say = require("say");

    return new Promise((resolve, reject) => {
        say.export(text, null, 1.0, outputFile, (err) => {
            if (err) reject(err);
            else resolve(outputFile);
        });
    });
};

const mergeVideo = async (videoFile, audioFile, outputFile) => {
    const ffmpeg = require("fluent-ffmpeg");
    const ffmpegPath = require("ffmpeg-static");

    ffmpeg.setFfmpegPath(ffmpegPath);

    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(videoFile)
            .input(audioFile)
            .outputOptions([
                "-c:v copy",
                "-c:a aac",
                "-map 0:v:0",
                "-map 1:a:0"
            ])
            .save(outputFile)
            .on("end", () => resolve(outputFile))
            .on("error", (err) => reject(err));
    });
};

// 🔥 MAIN ONE CLICK CONTROLLER
const dubVideo = async (req, res) => {
    try {
        const { videoFile, language } = req.body;

        if (!videoFile || !language) {
            return res.status(400).json({
                message: "videoFile and language required"
            });
        }

        const uploadsPath = path.join(__dirname, "../uploads", videoFile);
        const outputDir = path.join(__dirname, "../output");

        // STEP 1: transcribe
        const text = transcribeVideo(uploadsPath);

        // STEP 2: translate
        const translated = translateText(text, language);

        // STEP 3: voice
        const audioFile = `voice_${Date.now()}.mp3`;
        const audioPath = path.join(outputDir, audioFile);

        await generateVoice(translated, audioPath);

        // STEP 4: merge video + audio
        const finalVideo = `dubbed_${Date.now()}.mp4`;
        const finalPath = path.join(outputDir, finalVideo);

        await mergeVideo(uploadsPath, audioPath, finalPath);

        res.json({
            message: "Dub completed successfully 🎬",
            text,
            translated,
            audioFile,
            video: finalVideo
        });

    } catch (error) {
        res.status(500).json({
            message: "Dubbing failed",
            error: error.message
        });
    }
};

module.exports = { dubVideo };