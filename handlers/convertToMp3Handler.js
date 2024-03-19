const bot = require("../config/bot");
const { downloadVideo } = require("../utils/downloadVideo");
const { convertToMp3 } = require("../utils/convertToMp3");

const convertToMp3Handler = async (chatId) => {
  bot.sendMessage(chatId, "Send me a video to convert to mp3");

  bot.on("video", async (msg) => {
    try {
      const downloadedVideoPath = await downloadVideo({
        folderName: "videoToMp3",
        msg,
      });

      bot.sendMessage(chatId, "Converting video to mp3...");

      const mp3Path = await convertToMp3(downloadedVideoPath);
      bot.sendAudio(chatId, mp3Path, { title: "Converted to mp3" });
    } catch (error) {
      console.error("Error occurred:", error);
      bot.sendMessage(
        chatId,
        "An error occurred while converting the video to mp3."
      );
    }
  });
};

module.exports = { convertToMp3Handler };
