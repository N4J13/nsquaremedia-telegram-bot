const express = require("express");
const bot = require("./bot.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/", async (req, res)  => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
});

