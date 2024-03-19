const bot = require("../config/bot");
const { selectProcess } = require("../utils/helper");

const message = `
🤖 Welcome to N Square Media Bot!

Looking to manage your media files more efficiently? Look no further! N Square Media Bot is here to assist you with a range of handy features tailored for handling various media types.

Explore these features and more by selecting an option from the menu. Start optimizing your media files today with N Square Media Bot!
`;

const onStart = async (msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Compress Video 💾", callback_data: "compress" },
          { text: "Compress Image 📷", callback_data: "imageCompress" },
        ],
        [
          { text: "Video to mp3 🎵", callback_data: "videoTomp3" },
          { text: "Trim Video ✂️", callback_data: "trim" },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, message, keyboard).catch((e) => {
    console.log(e);
  });
};

const onCallbackQuery = (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const selectedProcess = selectProcess(data, msg.chat.id);
  bot.answerCallbackQuery(callbackQuery.id);
};

module.exports = { onStart, onCallbackQuery };
