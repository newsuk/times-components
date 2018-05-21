const path = require("path");

const ignoredShowcases = require("./ignored-showcases");

const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "web",
  ignoredShowcases,
  breakpoints: [520]
};

module.exports = config;
