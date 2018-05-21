const path = require("path");

const ignoredShowcases = require("./ignored-showcases");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "iOS",
  ignoredShowcases
};

module.exports = config;
