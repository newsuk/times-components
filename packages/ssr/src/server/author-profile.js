const authorProfile = require("../component/author-profile");
const runServer = require("../lib/run-server");
const defaultAdConfig = require("../lib/make-ad-config").defaultServer;

module.exports = ({
  currentPage,
  debounceTime = 0,
  logger,
  makeArticleUrl,
  perPage = 20,
  slug,
  uri
}) => {
  const options = {
    client: {
      logger,
      uri
    },
    data: {
      debounceTimeMs: debounceTime,
      makeArticleUrl,
      mapProfileToAdConfig: defaultAdConfig,
      page: currentPage,
      pageSize: perPage,
      slug
    },
    name: "authorProfile"
  };

  return runServer(authorProfile, options);
};
