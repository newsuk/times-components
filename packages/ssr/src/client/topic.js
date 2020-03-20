const topic = require("../component/topic");
const runClient = require("../lib/run-client");

if (window.nuk && window.nuk.ssr && window.nuk.topicPage) {
  const { rootTag, makeArticleUrl, makeTopicUrl } = window.nuk.ssr;
  const {
    debounceTimeMs,
    page,
    pageSize,
    topicSlug,
    useNewTopicDataSource
  } = window.nuk.topicPage;

  const data = {
    debounceTimeMs,
    makeArticleUrl,
    makeTopicUrl,
    page,
    pageSize,
    topicSlug
  };

  const clientOptions = {
    rootTag,
    useGET: true,
    skipAuthorization: true,
    headers: useNewTopicDataSource
      ? {
          "x-new-topic-data-source": true
        }
      : {}
  };

  runClient(topic, clientOptions, data);
}
