const topic = require("../component/topic");
const runServer = require("../lib/run-server");

module.exports = ({
  debounceTimeMs = 0,
  logger,
  makeArticleUrl,
  page,
  slug,
  uri
}) => {
  const options = {
    client: {
      logger,
      uri
    },
    data: {
      debounceTimeMs,
      makeArticleUrl,
      page,
      slug
    },
    name: "topicPage"
  };
  return runServer(topic, options);
};
