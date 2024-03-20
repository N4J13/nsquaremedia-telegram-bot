const { compressVideoHandler } = require("../handlers/compressVideoHandler");
const { convertToMp3Handler } = require("../handlers/convertToMp3Handler");
const { trimVideoHandler } = require("../handlers/trimVideoHandler");

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
      return "imageCompress";
    case "videoTomp3":
      return convertToMp3Handler(id);
    case "trim":
      return trimVideoHandler(id);
    default:
      return "default";
  }
}

module.exports = { getDuration, selectProcess };
