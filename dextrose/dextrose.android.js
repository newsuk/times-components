const path = require("path");

const ignoredStories = require("./ignored-showcases");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "Android",
  ignoredStories
};

module.exports = config;
