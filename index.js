const express = require("express");
require("dotenv").config();
const { onStart, onCallbackQuery } = require("./handlers/onboardHandler.js");
const ffmpeg = require("fluent-ffmpeg");
const bot = require("./config/bot.js");
const { trimVideo } = require("./utils/trimVideo.js");
const { getTotalSeconds } = require("./utils/durationUtils.js");

const PORT = process.env.PORT || 3000;
const app = express();

ffmpeg.setFfmpegPath( process.env.FFMPEG_PATH || "C:/ffmpeg/bin/ffmpeg.exe");
ffmpeg.setFfprobePath(process.env.FFMPEG_PROBE_PATH || "C:/ffmpeg/bin");
ffmpeg.setFlvtoolPath(process.env.FFMPEG_FLV_TOOL_PATH || "C:/flvtool");


app.get("/", async (req, res) => {
  res.send("Hello World!");
});



bot.onText(/\/start/, (msg) => onStart(msg));

bot.on("callback_query", (callbackQuery) => onCallbackQuery(callbackQuery));


app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
});
