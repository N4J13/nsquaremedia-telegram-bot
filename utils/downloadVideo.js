const fs = require("fs");
const bot = require("../config/bot");
const { generateRandomFileName } = require("./fileUtils");

const downloadVideo = async ({ folderName, msg }) => {
  const fileId = msg.video.file_id;
  const chatId = msg.chat.id;
  const folderPath = `./public/uploads/${folderName}/${chatId}`;
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    const fileName = msg.video.file_name || generateRandomFileName();
    const path = `${folderPath}/${fileName}`;
    const videoStream = bot.getFileStream(fileId);
    const fileWriter = fs.createWriteStream(path);
    videoStream.pipe(fileWriter);

    // send progress to the chat
    let progressMessage;
    videoStream.on("data", (chunk) => {
      const progress = (fileWriter.bytesWritten / msg.video.file_size) * 100;
      if (progressMessage) {
        bot.editMessageText(`Progress: ${progress.toFixed(2)}%`, {
          chat_id: chatId,
          message_id: progressMessage.message_id,
        });
      } else {
        bot
          .sendMessage(chatId, `Progress: ${progress.toFixed(2)}%`)
          .then((message) => {
            progressMessage = message;
          });
      }
    });
    // Handle file download completion
    fileWriter.on("finish", async () => {
      bot.sendMessage(chatId, "Video received");
      return resolve(path);
    });
  });
};

module.exports = { downloadVideo };
