/* eslint-env browser */

const topic = require("../../component/topic");
const runClient = require("../../lib/run-client");

module.exports = () => {
  const { debounceTimeMs, page, pageSize, slug } = window.nuk.topicPage || {};

  const data = {
    debounceTimeMs,
    page,
    pageSize,
    slug
  };

  runClient(topic, data);
};
