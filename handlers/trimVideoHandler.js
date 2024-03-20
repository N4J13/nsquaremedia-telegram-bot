const bot = require("../config/bot");
const { downloadVideo } = require("../utils/downloadVideo");
const { getTotalSeconds } = require("../utils/durationUtils");
const { trimVideo } = require("../utils/trimVideo");

const trimVideoHandler = (chatID) => {
  let startTime = 0;
  let endTime = 0;
  let downloadedPath = "";
  let awaitingStartTime = false;

  const askForStartTime = () => {
    bot.sendMessage(
      chatID,
      `Select an Ending Time in hh:mm:ss format
        
    Example: 00:00:10 for 10 seconds`
    );
    awaitingStartTime = true;
  };

  const askForEndTime = () => {
    bot.sendMessage(
      chatID,
      `Select an Ending Time in hh:mm:ss format
        
        Example: 00:00:10 for 10 seconds`
    );
    awaitingStartTime = false;
  };

  bot.sendMessage(
    chatID,
    `Send me a video 📽️ to trim
Sending as a file will not work. Please send it as a video.

  `
  );

  bot.on("video", async (msg) => {
    downloadedPath = await downloadVideo({
      folderName: "video-trim",
      msg,
    });

    askForStartTime();
  });

  bot.onText(/^(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)$/, async (msg) => {
    const time = msg.text;
    if (awaitingStartTime) {
      startTime = time;
      askForEndTime();
    } else {
      endTime = time;
      bot.sendMessage(chatID, "Trimming video...");
      const trimmedPath = await trimVideo({
        input: downloadedPath,
        start: getTotalSeconds(startTime),
        end: getTotalSeconds(endTime),
      });

      bot.sendDocument(chatID, trimmedPath, { caption: "Trimmed video" });
    }
  });
};

module.exports = { trimVideoHandler };
