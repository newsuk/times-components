const article = require("../component/article");
const runServer = require("../lib/run-server");

module.exports = ({ debounceTimeMs, headers, id, makeArticleUrl, uri }) => {
  const options = {
    client: {
      headers,
      uri
    },
    data: {
      debounceTimeMs,
      id,
      makeArticleUrl
    },
    name: "article"
  };

  return runServer(article, options);
};
