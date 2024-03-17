const { compressVideo } = require("../handlers/compressVideoHandler");

function getDuration(secs) {
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;
  var seconds = Math.ceil(divisor_for_seconds);

  var obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return (
    "Duration: " + obj.h + " hours " + obj.m + " minutes " + obj.s + " seconds"
  );
}

function selectProcess(data, bot, id) {
  switch (data) {
    case "compress":
      return compressVideo(bot, id);
    case "button2":
      return "button2";
    case "button3":
      return "button3";
    case "button4":
      return "button4";
    default:
      return "default";
  }
}

module.exports = { getDuration, selectProcess };
