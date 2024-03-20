const bot = require("../config/bot");
const fs = require("fs");

const downloadImage = (folderName, msg) => {
  return new Promise((resolve, reject) => {
    try {
      const fileId = msg.document.file_id;
      const fileUniqueName = msg.document.file_unique_id;
      const chatId = msg.chat.id;
      const fileExtension = msg.document.file_name.split(".").pop();

      if (
        fileExtension !== "jpg" &&
        fileExtension !== "jpeg" &&
        fileExtension !== "png"
      ) {
        reject("Invalid file type");
        bot.sendMessage(chatId, "Invalid file type");
      }

      const fileName = `${fileUniqueName}.${fileExtension}`;
      const folderPath = `./public/uploads/${folderName}/${chatId}`;

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const path = `${folderPath}/${fileName}`;
      const fileStream = bot.getFileStream(fileId);
      const fileWriter = fs.createWriteStream(path);
      fileStream.pipe(fileWriter);

      // Send progress to the chat

      let progressMessage;
      fileStream.on("data", (chunk) => {
        const progress =
          (fileWriter.bytesWritten / msg.document.file_size) * 100;
        if (progressMessage) {
          bot.editMessageText(`Progress: ${progress.toFixed(2)}%`, {
            chat_id: chatId,
            message_id: progressMessage.message_id,
          });
        } else if (progress >= 100) {
          bot.deleteMessage(chatId, progressMessage.message_id);
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
        bot.sendMessage(chatId, "Image received");
        return resolve(path);
      });

      fileWriter.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};


module.exports = { downloadImage };