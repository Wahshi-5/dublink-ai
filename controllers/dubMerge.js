const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);

const mergeVideoAudio = async (req, res) => {
    try {
        const { videoFile, audioFile } = req.body;

        if (!videoFile || !audioFile) {
            return res.status(400).json({
                message: "videoFile and audioFile required"
            });
        }

        const videoPath = path.join(__dirname, "../uploads", videoFile);
        const audioPath = path.join(__dirname, "../output", audioFile);

        const outputFile = `dubbed_${Date.now()}.mp4`;
        const outputPath = path.join(__dirname, "../output", outputFile);

        ffmpeg()
            .input(videoPath)
            .input(audioPath)
            .outputOptions([
                "-c:v copy",
                "-c:a aac",
                "-map 0:v:0",
                "-map 1:a:0"
            ])
            .save(outputPath)
            .on("end", () => {
                res.json({
                    message: "Dubbed video created successfully",
                    video: outputFile
                });
            })
            .on("error", (err) => {
                res.status(500).json({
                    message: "Merge failed",
                    error: err.message
                });
            });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { mergeVideoAudio };