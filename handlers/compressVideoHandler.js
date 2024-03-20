const bot = require("../config/bot");
const { compressVideo } = require("../utils/compressVideo");
const { downloadVideo } = require("../utils/downloadVideo");
const fs = require("fs");

const compressVideoHandler = ( chatId) => {
  bot.sendMessage(chatId, "Send me a video to compress");

  let downloadedVideoPath; // Declare the variable outside the callback function

  bot.on("video", async (msg) => {
    try {
      downloadedVideoPath = await downloadVideo({
        folderName: "compress",
        msg,
      });

      bot.sendMessage(chatId, "Compressing video...");

      const compressedVideoPath = await compressVideo({
        inputPath: downloadedVideoPath,
      });
      bot.sendDocument(chatId, fs.readFileSync(compressedVideoPath), {
        caption: "Compressed video",
      });
    } catch (error) {
      console.error("Error occurred:", error);
      bot.sendMessage(chatId, "An error occurred while compressing the video.");
    }
  });
};

module.exports = { compressVideoHandler };
