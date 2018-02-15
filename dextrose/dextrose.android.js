const path = require("path");
const ignoredStories = require("./ignoredStories");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "Android",
  ignoredStories
};

module.exports = config;
