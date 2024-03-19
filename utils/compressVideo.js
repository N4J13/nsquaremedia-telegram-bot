const ffmpeg = require("fluent-ffmpeg");

const compressVideo = ({ inputPath }) => {
  return new Promise((resolve, reject) => {
    try {
      const outputPath = inputPath.replace(/\.[^.]+$/, "") + "_compressed.mp4";
      ffmpeg(inputPath)
        .videoBitrate(1024)
        .save(outputPath)
        .on("end", () => resolve(outputPath))
        .on("error", (err) => reject(err));
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { compressVideo };
