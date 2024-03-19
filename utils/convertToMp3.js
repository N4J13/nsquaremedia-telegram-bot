const ffmpeg = require("fluent-ffmpeg");

const convertToMp3 = async (videoPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .outputOptions("-vn", "-ab", "128k", "-ar", "44100")
      .on("end", () => {
        console.log("Conversion finished");
        resolve(videoPath.replace(".mp4", ".mp3"));
      })
      .on("error", (error) => {
        console.error("Error occurred while converting to mp4:", error);
        reject(error);
      })
      .save("./public/" + videoPath.replace(".mp4", ".mp3"));
  });
};

module.exports = { convertToMp3 };
