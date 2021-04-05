const article = require("../component/article");
const runServer = require("../lib/run-server");

const { TakeoverBailout } = article;

module.exports.TakeoverBailout = TakeoverBailout;

module.exports = (
  articleId,
  headers,
  {
    graphqlApiUrl,
    logger,
    logoUrl,
    makeArticleUrl,
    makeTopicUrl,
    navigationMode,
    spotAccountId,
    paidContentClassName,
    isPreview
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
      logoUrl,
      makeArticleUrl,
      makeTopicUrl,
      navigationMode,
      spotAccountId,
      userState,
      paidContentClassName,
      isPreview
    },
    name: "article"
  };

  return runServer(article, options).catch(error => {
    throw new Error(error);
  });
};
