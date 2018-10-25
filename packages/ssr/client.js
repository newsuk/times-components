const articleClient = require("./src/client/article");
const authorProfileClient = require("./src/client/author-profile");
const topicClient = require("./src/client/topic");

module.exports = {
  article: articleClient,
  authorProfile: authorProfileClient,
  topic: topicClient
};
