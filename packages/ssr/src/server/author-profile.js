const authorProfile = require("../component/author-profile");
const runServer = require("../lib/run-server");
const defaultAdConfig = require("../lib/ads/make-author-profile-ad-config")
  .defaultServer;

module.exports = (
  { authorSlug, currentPage },
  { graphqlApiUrl, logger, makeArticleUrl }
) => {
  if (typeof authorSlug !== "string") {
    throw new Error(`Author slug should be a string. Received ${authorSlug}`);
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

  const options = {
    client: {
      logger,
      uri: graphqlApiUrl
    },
    data: {
      authorSlug,
      debounceTimeMs: 0,
      makeArticleUrl,
      mapProfileToAdConfig: defaultAdConfig,
      page: currentPage,
      pageSize: 20
    },
    name: "authorProfile"
  };

  return runServer(authorProfile, options);
};
