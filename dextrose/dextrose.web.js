const path = require("path");

const ignoredStories = require("./ignored-showcases");

console.log(ignoredStories)
const config = {
  snapPath: path.join(__dirname, "/snappy"),
  platformName: "web",
  ignoredStories,
  breakpoints: [520]
};

module.exports = config;
