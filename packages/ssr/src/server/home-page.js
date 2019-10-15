const homePage = require("../component/home-page");
const runServer = require("../lib/run-server");
const defaultAdConfig = require("../lib/ads/make-homePage-ad-config")
  .defaultServer;

module.exports = (
  { editionId },
  { graphqlApiUrl, logger, makeArticleUrl, makeTopicUrl }
) => {
  if (typeof editionId !== "string") {
    throw new Error(`EditionId should be a string. Received ${editionId}`);
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
      uri: graphqlApiUrl
    },
    data: {
      editionId,
      debounceTimeMs: 0,
      makeArticleUrl,
      makeTopicUrl,
      mapProfileToAdConfig: defaultAdConfig
    },
    name: "homePage"
  };

  return runServer(homePage, options);
};
