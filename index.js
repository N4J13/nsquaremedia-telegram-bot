const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();
const config = require("./config/config.js");
const { onStart, onCallbackQuery } = require("./handlers/onboardHandler.js");

const PORT = process.env.PORT || 3000;
const app = express();

const TOKEN = config.botToken;
const bot = new TelegramBot(TOKEN, { polling: true });

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

bot.onText(/\/start/, (msg) => onStart(bot, msg));

bot.on("callback_query", (callbackQuery) =>
  onCallbackQuery(bot, callbackQuery)
);

app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
});
