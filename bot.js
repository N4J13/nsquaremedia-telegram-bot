const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const ffmpeg = require("ffmpeg");
const getDuration = require("./utils/helper");

const token = "7133084051:AAFhCdCvdE-tFpsqg7QZHWvOcJVBh0J4adQ";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  bot.sendMessage(chatId, `Welcome, ${firstName}!`);
});

bot.onText("/sendphoto", (msg) => {
  const chatId = msg.chat.id;
  const baseDir = process.cwd();
  const imagePath =
    baseDir + "/public/WhatsApp Image 2024-01-12 at 14.40.14_ca2812af.jpg";
  const image =
    "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

  if (process.env.NODE_ENV === "production") {
    bot.sendPhoto(chatId, image);
  } else {
    fs.readFile(imagePath, (error, data) => {
      if (error) {
        console.error("Error reading image file:", error);
        return;
      }

      // Send the image to the chat
      bot.sendPhoto(chatId, data);
    });
  }
});

bot.on("video", async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(msg.chat.id, "Uploading video...");
  let path = "./public/" + chatId + "/";
  const fileName = msg.video.file_name;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  const videoStream = bot.getFileStream(msg.video.file_id);
  const filePath = `${path}${fileName}`;
  const fileWriter = fs.createWriteStream(filePath);
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
    let videoDuration;
    try {
      const process = new ffmpeg(filePath);
      process.then((video) => {
        videoDuration = video.metadata.duration.seconds;
        bot.sendMessage(
          chatId,
          `${getDuration(videoDuration)} seconds video received`
        );
      });
    } catch (error) {
      console.error("Error getting video metadata:", error);
      bot.sendMessage(
        chatId,
        "An error occurred while getting video metadata."
      );
    }
  });

  // Handle errors during file download
  fileWriter.on("error", (error) => {
    console.error("Error downloading video:", error);
    bot.sendMessage(chatId, "An error occurred while downloading the video.");
  });
});

module.exports = bot;
