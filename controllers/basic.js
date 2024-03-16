const bot = require("../bot.js");

const start = (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  bot.sendMessage(chatId, `Welcome, ${firstName}!`);
};

module.exports = { start };
