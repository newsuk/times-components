const path = require("path");

const ignoredStories = require("./ignored-showcases");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "iOS",
  ignoredStories
};

module.exports = config;
