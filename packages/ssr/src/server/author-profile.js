const authorProfile = require("../component/author-profile");
const runServer = require("../lib/run-server");

module.exports = ({
  currentPage,
  debounceTime = 0,
  makeArticleUrl,
  perPage = 20,
  slug,
  uri
}) => {
  const options = {
    client: {
      uri
    },
    data: {
      debounceTimeMs: debounceTime,
      makeArticleUrl,
      mapProfileToAdConfig: () => ({}),
      page: currentPage,
      pageSize: perPage,
      slug
    },
    name: "authorProfile"
  };

  return runServer(authorProfile, options);
};
