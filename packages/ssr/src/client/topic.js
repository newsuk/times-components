const topic = require("../component/topic");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.topicPage) {
  const { rootTag, makeArticleUrl, mapTopicToAdConfig } = window.nuk.ssr;
  const { debounceTimeMs, page, pageSize, topicSlug } = window.nuk.topicPage;

  const data = {
    debounceTimeMs,
    makeArticleUrl,
    mapTopicToAdConfig,
    page,
    pageSize,
    topicSlug
  };

  const clientOptions = {
    rootTag,
    useGET: true
  };

  runClient(topic, clientOptions, data);
}
