const article = require("../component/article");
const runServer = require("../lib/run-server");

const { TakeoverBailout } = article;

module.exports.TakeoverBailout = TakeoverBailout;

module.exports = (
  articleId,
  headers,
  {
    graphqlApiUrl,
    usePersistedQueries,
    clientName,
    logger,
    logoUrl,
    makeArticleUrl,
    makeTopicUrl,
    navigationMode,
    commentingConfig,
    paidContentClassName,
    isPreview,
    swgProductId,
    getFallbackThumbnailUrl169,
    zephrDivs,
    sharingSavingFlag = true,
    commentingFlag = true,
    showAudioPlayer
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
  if (typeof commentingConfig !== "object") {
    throw new Error(
      `SpotIM account ID should be an object. Received ${commentingConfig}`
    );
  }

  const options = {
    client: {
      headers,
      logger,
      uri: graphqlApiUrl,
      usePersistedQueries,
      clientName
    },
    data: {
      articleId,
      debounceTimeMs: 0,
      logoUrl,
      makeArticleUrl,
      makeTopicUrl,
      getFallbackThumbnailUrl169,
      navigationMode,
      commentingConfig,
      userState,
      paidContentClassName,
      isPreview,
      swgProductId,
      zephrDivs,
      sharingSavingFlag,
      commentingFlag,
      showAudioPlayer
    },
    name: "article"
  };

  return runServer(article, options).catch(error => {
    throw new Error(error);
  });
};
