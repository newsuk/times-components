const articleClient = require("./src/client/common/article");
const authorProfileClient = require("./src/client/common/author-profile");
const topicClient = require("./src/client/common/topic");

module.exports = {
  article: articleClient,
  authorProfile: authorProfileClient,
  topic: topicClient
};
