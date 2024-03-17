const { downloadVideo } = require("../utils/downloadVideo");

const compressVideo = (bot, chatId) => {
  bot.sendMessage(chatId, "Send me a video to compress");
  bot.on("video", async (msg) => {
    const downloadPath = `./public/${chatId}/${msg.video.file_id}.mp4`;
    downloadVideo(msg, downloadPath, bot, chatId);
  });
};

module.exports = { compressVideo };
