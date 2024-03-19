function generateRandomFileName() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    ".mp4"
  );
}

module.exports = { generateRandomFileName };
