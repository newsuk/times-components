const path = require("path");

const ignoredShowcases = require("./ignored-showcases");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "Android",
  ignoredShowcases
};

module.exports = config;
