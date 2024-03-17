const { selectProcess } = require("../utils/helper");

const onStart = (bot, msg) => {
  const chatId = msg.chat.id;
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Compress Video 💾", callback_data: "compress" },
          { text: "Button 2", callback_data: "button2" },
        ],
        [
          { text: "Button 3", callback_data: "button3" },
          { text: "Button 4", callback_data: "button4" },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, "Choose an option:", keyboard);
};

const onCallbackQuery = (bot, callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const selectedProcess = selectProcess(data, bot, msg.chat.id);
  bot.answerCallbackQuery(callbackQuery.id);
};

module.exports = { onStart, onCallbackQuery };
