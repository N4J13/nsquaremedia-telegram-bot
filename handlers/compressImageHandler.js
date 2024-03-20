const bot = require("../config/bot");
const fs = require("fs");
const { compressImage } = require("../utils/compressImage");
const { downloadImage } = require("../utils/downloadImage");

const compressImageHandler = (chatId) => {
  // Send a message to the user to send an image to compress

  bot.sendMessage(chatId, "Send me an image to compress");

  // Listen for an image message from the user

  bot.on("document", async (msg) => {
    const chatId = msg.chat.id;

    // Download the image from the message
    const downloadedPath = await downloadImage("compress", msg);

    // Send a message to the user that the image is being compressed
    bot.sendMessage(chatId, "Compressing image...");

    // Compress the image
    const compressedImagePath = await compressImage(downloadedPath);

    // Send the compressed image to the user
    bot.sendDocument(chatId, fs.readFileSync(compressedImagePath), {
      caption: "Compressed image",
    });
  });
};

module.exports = { compressImageHandler };
