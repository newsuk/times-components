const article = require("../component/article");
const runServer = require("../lib/run-server");
const defaultAdConfig = require("../lib/make-ad-config").defaultServer;

module.exports = ({
  debounceTimeMs = 0,
  headers,
  id,
  logger,
  makeArticleUrl,
  uri
}) => {
  const options = {
    client: {
      headers,
      logger,
      uri
    },
    data: {
      debounceTimeMs,
      id,
      makeArticleUrl,
      mapArticleToAdConfig: defaultAdConfig
    },
    name: "article"
  };

  return runServer(article, options);
};
