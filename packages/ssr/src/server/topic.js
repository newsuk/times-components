const topic = require("../component/topic");
const runServer = require("../lib/run-server");

module.exports = ({ debounceTimeMs = 0, makeArticleUrl, page, slug, uri }) => {
  const options = {
    client: {
      uri
    },
    data: {
      debounceTimeMs,
      makeArticleUrl,
      page,
      slug,
      uri
    },
    name: "topic"
  };
  return runServer(topic, options);
};
