const getTotalSeconds = (duration) => {
  const durationArray = duration.split(":");
  const [hour, minute, second] = durationArray.map(Number);
  return hour * 3600 + minute * 60 + second;
};

module.exports = { getTotalSeconds };
