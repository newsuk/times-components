const path = require("path");
const ignoredStories = require("./ignoredStories");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "iOS",
  ignoredStories
};

module.exports = config;
