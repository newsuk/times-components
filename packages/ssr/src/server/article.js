const article = require("../component/article");
const runServer = require("../lib/run-server");
const defaultAdConfig = require("../lib/make-ad-config").defaultServer;

module.exports = (
  articleId,
  headers,
  { graphqlApiUrl, logger, makeArticleUrl }
) => {
  if (typeof articleId !== "string") {
    throw new Error(`Article ID should be a string. Received ${articleId}`);
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
      headers,
      logger,
      uri: graphqlApiUrl
    },
    data: {
      articleId,
      debounceTimeMs: 0,
      makeArticleUrl,
      mapArticleToAdConfig: defaultAdConfig
    },
    name: "article"
  };

  return runServer(article, options);
};
