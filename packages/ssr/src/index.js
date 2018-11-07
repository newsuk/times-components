const server = require("./server");
const outputFolder = require("./lib/resolve-dist");

module.exports = {
  bundleDirectory: outputFolder,
  render: server
};
