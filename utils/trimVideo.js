const ffmpeg = require("fluent-ffmpeg");

const trimVideo = async ({ input, start, end }) => {
  const format = input.endsWith(".mp4") ? "mp4" : "mkv";
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .setStartTime(start)
      .setDuration(end - start)
      .save(input.replace(`.${format}`, `_trimmed.${format}`))
      .on("end", () => {
        console.log("Trimming finished");
        resolve(input.replace(`.${format}`, `_trimmed.${format}`));
      })
      .on("error", (error) => {
        console.error("Error occurred while trimming:", error);
        reject(error);
      });
  });
};

module.exports = { trimVideo };
