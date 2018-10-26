/* eslint-env browser */

const article = require("../component/article");
const runClient = require("../lib/run-client");

module.exports = () => {
  runClient(article, window.nuk.id, window.nuk.adConfig);
};
