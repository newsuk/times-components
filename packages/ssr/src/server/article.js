const article = require("../component/article");
const runServer = require("../lib/run-server");
const defaultAdConfig = require("../lib/ads/make-article-ad-config")
  .defaultServer;

const { TakeoverBailout } = article;

module.exports.TakeoverBailout = TakeoverBailout;

module.exports = (
  articleId,
  headers,
  {
    graphqlApiUrl,
    logger,
    makeArticleUrl,
    makeTopicUrl,
    navigationMode,
    spotAccountId,
    paidContentClassName,
    faviconUrl
  },
  userState
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
  if (!makeTopicUrl) {
    throw new Error(
      `Make topic url function is required. Received ${makeTopicUrl}`
    );
  }
  if (typeof spotAccountId !== "string") {
    throw new Error(
      `SpotIM account ID should be a string. Received ${spotAccountId}`
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
      makeTopicUrl,
      mapArticleToAdConfig: defaultAdConfig,
      navigationMode,
      spotAccountId,
      userState,
      paidContentClassName,
      faviconUrl
    },
    name: "article"
  };

  return runServer(article, options).catch(error => {
    throw new Error(error);
  });
};
