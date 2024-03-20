const e = require("express");
const sharp = require("sharp");

const compressImage = (inputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const format = inputPath.endsWith(".png") ? "png" : "jpeg";
      const outputPath =
        inputPath.replace(/\.[^.]+$/, "") + `_compressed.${format}`;
      sharp(inputPath)
        .toFormat(format, { quality: 70 })
        .on("error", (err) => reject(err))
        .on("end", () => resolve(outputPath))
        .toFile(outputPath, (err, info) => {
          if (err) {
            reject(err);
          } else {
            resolve(outputPath);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
};


module.exports = { compressImage };