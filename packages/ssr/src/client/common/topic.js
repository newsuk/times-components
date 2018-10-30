/* eslint-env browser */

const topic = require("../../component/topic");
const runClient = require("../../lib/run-client");

module.exports = (makeArticleUrl, mapTopicToAdConfig) => {
  const { debounceTimeMs, page, pageSize, slug } = window.nuk.topicPage || {};

  const data = {
    debounceTimeMs,
    makeArticleUrl,
    mapTopicToAdConfig,
    page,
    pageSize,
    slug
  };

  const useGET = true;

  runClient(topic, useGET, data);
};
