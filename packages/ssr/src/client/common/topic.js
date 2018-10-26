/* eslint-env browser */

const topic = require("../component/topic");
const runClient = require("../lib/run-client");

module.exports = () => {
  runClient(topic, window.nuk.slug, window.nuk.page);
};
