const topic = require("../component/topic");
const runServer = require("../lib/run-server");
const defaultAdConfig = require("../lib/ads/make-topic-ad-config")
  .defaultServer;

module.exports = (
  { currentPage, topicSlug },
  { graphqlApiUrl, logger, makeArticleUrl, makeTopicUrl }
) => {
  if (typeof topicSlug !== "string") {
    throw new Error(`Topic slug should be a string. Received ${topicSlug}`);
  }
  if (!Number.isInteger(currentPage) || currentPage < 1) {
    throw new Error(
      `Current page should be a positive integer. Received ${currentPage}`
    );
  }
  if (!graphqlApiUrl) {
    throw new Error(`GraphQL API URL is required. Received ${graphqlApiUrl}`);
  }
  if (!logger) {
    throw new Error(`Logger is required. Received ${logger}`);
  }
  if (!makeArticleUrl) {
    throw new Error(
      `Make article url function is required. Received ${makeArticleUrl}`
    );
  }
  if (!makeTopicUrl) {
    throw new Error(
      `Make topic url function is required. Received ${makeTopicUrl}`
    );
  }

  const options = {
    client: {
      logger,
      uri: graphqlApiUrl,
      headers: {
        "x-new-topic-data-source": true
      }
    },
    data: {
      debounceTimeMs: 0,
      makeArticleUrl,
      makeTopicUrl,
      mapTopicToAdConfig: defaultAdConfig,
      page: currentPage,
      pageSize: 20,
      topicSlug
    },
    name: "topicPage"
  };
  return runServer(topic, options);
};
