const { compressImageHandler } = require("../handlers/compressImageHandler");
const { compressVideoHandler } = require("../handlers/compressVideoHandler");
const { convertToMp3Handler } = require("../handlers/convertToMp3Handler");

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

function selectProcess(data, id) {
  switch (data) {
    case "compress":
      return compressVideoHandler(id);
    case "imageCompress":
      return compressImageHandler(id);
    case "videoTomp3":
      return convertToMp3Handler(id);
    case "button4":
      return "button4";
    default:
      return "default";
  }
}

module.exports = { getDuration, selectProcess };
