/* eslint-env browser */

const topic = require("../../component/topic");
const runClient = require("../../lib/run-client");

module.exports = (rootTag, makeArticleUrl, mapTopicToAdConfig) => {
  const { debounceTimeMs, page, pageSize, slug } = window.nuk.topicPage || {};

  const data = {
    debounceTimeMs,
    makeArticleUrl,
    mapTopicToAdConfig,
    page,
    pageSize,
    slug
  };

  const clientOptions = {
    rootTag,
    useGET: true
  };

  runClient(topic, clientOptions, data);
};
